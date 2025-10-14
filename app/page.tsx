import { Suspense } from 'react'
import { prisma } from '@/lib/prisma'
import { AddTodoForm } from '@/components/AddTodoForm'
import { TodoList } from '@/components/TodoList'
import { CheckSquare, Loader2 } from 'lucide-react'

async function getTodos() {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return todos
  } catch (error) {
    console.error('Failed to fetch todos:', error)
    return []
  }
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center py-16">
      <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
    </div>
  )
}

async function TodosContent() {
  const todos = await getTodos()
  return <TodoList todos={todos} />
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
              <CheckSquare className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Todo App
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Stay organized, stay productive ✨
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Add Todo Form */}
        <AddTodoForm />

        {/* Todo List */}
        <Suspense fallback={<LoadingState />}>
          <TodosContent />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            Built with{' '}
            <span className="text-red-500">♥</span>{' '}
            using Next.js 15, Prisma & Vercel Postgres
          </p>
        </div>
      </footer>
    </div>
  )
}
