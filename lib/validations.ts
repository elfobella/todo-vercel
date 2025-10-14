import { z } from 'zod'

// Todo validation schemas
export const createTodoSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title is too long'),
  description: z.string().max(500, 'Description is too long').optional(),
})

export const updateTodoSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title is too long').optional(),
  description: z.string().max(500, 'Description is too long').optional().nullable(),
  completed: z.boolean().optional(),
})

export const todoIdSchema = z.string().cuid()

// Type exports
export type CreateTodoInput = z.infer<typeof createTodoSchema>
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>

