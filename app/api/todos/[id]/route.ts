import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { updateTodoSchema, todoIdSchema } from '@/lib/validations'
import { ZodError } from 'zod'

type RouteContext = {
  params: Promise<{ id: string }>
}

// PATCH /api/todos/[id] - Update a todo
export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params
    
    // Validate ID
    const validatedId = todoIdSchema.parse(id)
    
    const body = await request.json()
    
    // Validate request body
    const validatedData = updateTodoSchema.parse(body)

    // Check if todo exists
    const existingTodo = await prisma.todo.findUnique({
      where: { id: validatedId },
    })

    if (!existingTodo) {
      return NextResponse.json(
        {
          success: false,
          error: 'Todo not found',
        },
        { status: 404 }
      )
    }

    // Update todo
    const updatedTodo = await prisma.todo.update({
      where: { id: validatedId },
      data: validatedData,
    })

    return NextResponse.json({
      success: true,
      data: updatedTodo,
      message: 'Todo updated successfully',
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: error.issues,
        },
        { status: 400 }
      )
    }

    console.error('PATCH /api/todos/[id] error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update todo',
      },
      { status: 500 }
    )
  }
}

// DELETE /api/todos/[id] - Delete a todo
export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params
    
    // Validate ID
    const validatedId = todoIdSchema.parse(id)

    // Check if todo exists
    const existingTodo = await prisma.todo.findUnique({
      where: { id: validatedId },
    })

    if (!existingTodo) {
      return NextResponse.json(
        {
          success: false,
          error: 'Todo not found',
        },
        { status: 404 }
      )
    }

    // Delete todo
    await prisma.todo.delete({
      where: { id: validatedId },
    })

    return NextResponse.json({
      success: true,
      message: 'Todo deleted successfully',
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid todo ID',
        },
        { status: 400 }
      )
    }

    console.error('DELETE /api/todos/[id] error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete todo',
      },
      { status: 500 }
    )
  }
}

