'use client'

import { useState, useTransition } from 'react'
import { Todo } from '@prisma/client'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toggleTodoAction, deleteTodoAction, updateTodoAction } from '@/app/actions/todo-actions'
import { Trash2, Edit2, Save, X, Calendar } from 'lucide-react'
import { toast } from 'sonner'
import { formatDistanceToNow } from 'date-fns'

interface TodoItemProps {
  todo: Todo
}

export function TodoItem({ todo }: TodoItemProps) {
  const [isPending, startTransition] = useTransition()
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)
  const [editDescription, setEditDescription] = useState(todo.description || '')

  const handleToggle = () => {
    startTransition(async () => {
      const result = await toggleTodoAction(todo.id)
      if (result.success) {
        toast.success(result.message)
      } else {
        toast.error(result.error || 'Failed to update todo')
      }
    })
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this todo?')) {
      startTransition(async () => {
        const result = await deleteTodoAction(todo.id)
        if (result.success) {
          toast.success(result.message)
        } else {
          toast.error(result.error || 'Failed to delete todo')
        }
      })
    }
  }

  const handleSaveEdit = () => {
    if (!editTitle.trim()) {
      toast.error('Title cannot be empty')
      return
    }

    startTransition(async () => {
      const result = await updateTodoAction(todo.id, {
        title: editTitle,
        description: editDescription || null,
      })

      if (result.success) {
        toast.success(result.message)
        setIsEditing(false)
      } else {
        toast.error(result.error || 'Failed to update todo')
      }
    })
  }

  const handleCancelEdit = () => {
    setEditTitle(todo.title)
    setEditDescription(todo.description || '')
    setIsEditing(false)
  }

  return (
    <div
      className={`group bg-white dark:bg-gray-800 rounded-xl shadow-md border-2 transition-all duration-300 hover:shadow-lg ${
        todo.completed
          ? 'border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/20'
          : 'border-gray-200 dark:border-gray-700'
      }`}
    >
      <div className="p-5">
        {isEditing ? (
          <div className="space-y-3 animate-in fade-in duration-200">
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              disabled={isPending}
              placeholder="Todo title"
            />
            <Textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              disabled={isPending}
              placeholder="Todo description (optional)"
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleSaveEdit}
                disabled={isPending}
              >
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCancelEdit}
                disabled={isPending}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-start gap-4">
              <button
                onClick={handleToggle}
                disabled={isPending}
                className="mt-0.5 transition-transform hover:scale-110 active:scale-95"
              >
                <Checkbox checked={todo.completed} />
              </button>

              <div className="flex-1 min-w-0">
                <h3
                  className={`text-lg font-semibold transition-all ${
                    todo.completed
                      ? 'text-gray-400 line-through'
                      : 'text-gray-900 dark:text-white'
                  }`}
                >
                  {todo.title}
                </h3>

                {todo.description && (
                  <p
                    className={`mt-1 text-sm transition-all ${
                      todo.completed
                        ? 'text-gray-400 line-through'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {todo.description}
                  </p>
                )}

                <div className="mt-2 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })}</span>
                </div>
              </div>

              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsEditing(true)}
                  disabled={isPending}
                  className="hover:bg-blue-100 dark:hover:bg-blue-900"
                >
                  <Edit2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </Button>

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleDelete}
                  disabled={isPending}
                  className="hover:bg-red-100 dark:hover:bg-red-900"
                >
                  <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

