import { Todo } from '@prisma/client'

// Re-export Prisma types
export type { Todo }

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface TodosResponse {
  todos: Todo[]
  count: number
}

