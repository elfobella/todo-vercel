import { Todo } from '@prisma/client'
import { TodoItem } from './TodoItem'
import { EmptyState } from './EmptyState'

interface TodoListProps {
  todos: Todo[]
}

export function TodoList({ todos }: TodoListProps) {
  if (todos.length === 0) {
    return <EmptyState />
  }

  const activeTodos = todos.filter((todo) => !todo.completed)
  const completedTodos = todos.filter((todo) => todo.completed)

  return (
    <div className="space-y-8">
      {/* Active Todos */}
      {activeTodos.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Active Tasks
            </h2>
            <span className="px-3 py-1 text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full">
              {activeTodos.length}
            </span>
          </div>
          <div className="space-y-3">
            {activeTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
      )}

      {/* Completed Todos */}
      {completedTodos.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-600 dark:text-gray-400">
              Completed
            </h2>
            <span className="px-3 py-1 text-sm font-semibold bg-green-600 text-white rounded-full">
              {completedTodos.length}
            </span>
          </div>
          <div className="space-y-3">
            {completedTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

