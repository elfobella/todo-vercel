import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createTodoSchema } from '@/lib/validations'
import { ZodError } from 'zod'

// GET /api/todos - Fetch all todos
export async function GET() {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({
      success: true,
      data: todos,
      count: todos.length,
    })
  } catch (error) {
    console.error('GET /api/todos error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch todos',
      },
      { status: 500 }
    )
  }
}

// POST /api/todos - Create a new todo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request body
    const validatedData = createTodoSchema.parse(body)

    const todo = await prisma.todo.create({
      data: {
        title: validatedData.title,
        description: validatedData.description || null,
      },
    })

    return NextResponse.json(
      {
        success: true,
        data: todo,
        message: 'Todo created successfully',
      },
      { status: 201 }
    )
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

    console.error('POST /api/todos error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create todo',
      },
      { status: 500 }
    )
  }
}

