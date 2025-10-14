import { CheckCircle2 } from 'lucide-react'

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-2xl opacity-20 animate-pulse" />
        <CheckCircle2 className="relative h-24 w-24 text-gray-300 dark:text-gray-700" strokeWidth={1.5} />
      </div>
      
      <h3 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
        All Clear! 🎉
      </h3>
      
      <p className="mt-2 text-gray-600 dark:text-gray-400 text-center max-w-sm">
        You don&apos;t have any todos yet. Create one above to get started!
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-500 dark:text-gray-500">
        <div className="flex items-center gap-2">
          <span className="text-2xl">✍️</span>
          <span>Add tasks</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">✅</span>
          <span>Complete them</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          <span>Stay organized</span>
        </div>
      </div>
    </div>
  )
}

