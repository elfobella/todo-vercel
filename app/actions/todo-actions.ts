'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { createTodoSchema, updateTodoSchema } from '@/lib/validations'
import { ZodError } from 'zod'

export type ActionResponse<T = unknown> = {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Create a new todo
export async function createTodoAction(formData: FormData): Promise<ActionResponse> {
  try {
    const title = formData.get('title') as string
    const description = formData.get('description') as string

    // Validate input
    const validatedData = createTodoSchema.parse({
      title,
      description: description || undefined,
    })

    // Create todo
    const todo = await prisma.todo.create({
      data: {
        title: validatedData.title,
        description: validatedData.description || null,
      },
    })

    // Revalidate the home page to show new todo
    revalidatePath('/')

    return {
      success: true,
      data: todo,
      message: 'Todo created successfully! 🎉',
    }
  } catch (error) {
    if (error instanceof ZodError) {
      const firstError = error.issues[0]
      return {
        success: false,
        error: firstError?.message || 'Validation failed',
      }
    }

    console.error('createTodoAction error:', error)
    return {
      success: false,
      error: 'Failed to create todo. Please try again.',
    }
  }
}

// Toggle todo completion status
export async function toggleTodoAction(id: string): Promise<ActionResponse> {
  try {
    // Get current todo
    const todo = await prisma.todo.findUnique({
      where: { id },
    })

    if (!todo) {
      return {
        success: false,
        error: 'Todo not found',
      }
    }

    // Toggle completion
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: {
        completed: !todo.completed,
      },
    })

    revalidatePath('/')

    return {
      success: true,
      data: updatedTodo,
      message: updatedTodo.completed ? 'Todo completed! ✅' : 'Todo reopened 🔄',
    }
  } catch (error) {
    console.error('toggleTodoAction error:', error)
    return {
      success: false,
      error: 'Failed to update todo',
    }
  }
}

// Update todo
export async function updateTodoAction(
  id: string,
  data: { title?: string; description?: string | null }
): Promise<ActionResponse> {
  try {
    // Validate input
    const validatedData = updateTodoSchema.parse(data)

    // Check if todo exists
    const existingTodo = await prisma.todo.findUnique({
      where: { id },
    })

    if (!existingTodo) {
      return {
        success: false,
        error: 'Todo not found',
      }
    }

    // Update todo
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: validatedData,
    })

    revalidatePath('/')

    return {
      success: true,
      data: updatedTodo,
      message: 'Todo updated successfully! 📝',
    }
  } catch (error) {
    if (error instanceof ZodError) {
      const firstError = error.issues[0]
      return {
        success: false,
        error: firstError?.message || 'Validation failed',
      }
    }

    console.error('updateTodoAction error:', error)
    return {
      success: false,
      error: 'Failed to update todo',
    }
  }
}

// Delete todo
export async function deleteTodoAction(id: string): Promise<ActionResponse> {
  try {
    // Check if todo exists
    const existingTodo = await prisma.todo.findUnique({
      where: { id },
    })

    if (!existingTodo) {
      return {
        success: false,
        error: 'Todo not found',
      }
    }

    // Delete todo
    await prisma.todo.delete({
      where: { id },
    })

    revalidatePath('/')

    return {
      success: true,
      message: 'Todo deleted successfully! 🗑️',
    }
  } catch (error) {
    console.error('deleteTodoAction error:', error)
    return {
      success: false,
      error: 'Failed to delete todo',
    }
  }
}

// Get all todos (for client components)
export async function getTodosAction(): Promise<ActionResponse> {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return {
      success: true,
      data: todos,
    }
  } catch (error) {
    console.error('getTodosAction error:', error)
    return {
      success: false,
      error: 'Failed to fetch todos',
    }
  }
}

