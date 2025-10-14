'use client'

import { useRef, useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { createTodoAction } from '@/app/actions/todo-actions'
import { Plus, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export function AddTodoForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [isPending, startTransition] = useTransition()
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const result = await createTodoAction(formData)

      if (result.success) {
        toast.success(result.message || 'Todo created successfully!')
        formRef.current?.reset()
        setIsExpanded(false)
      } else {
        toast.error(result.error || 'Failed to create todo')
      }
    })
  }

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-gray-100 dark:border-gray-700 p-6 transition-all">
      <form
        ref={formRef}
        action={handleSubmit}
        className="space-y-4"
      >
        <div className="space-y-3">
          <Input
            name="title"
            placeholder="What needs to be done? ✨"
            required
            disabled={isPending}
            onFocus={() => setIsExpanded(true)}
            className="text-base"
          />
          
          {isExpanded && (
            <Textarea
              name="description"
              placeholder="Add some details... (optional)"
              disabled={isPending}
              className="animate-in slide-in-from-top-2 duration-300"
            />
          )}
        </div>

        <div className="flex gap-3">
          <Button
            type="submit"
            disabled={isPending}
            className="flex-1 sm:flex-none"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Add Todo
              </>
            )}
          </Button>

          {isExpanded && (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                formRef.current?.reset()
                setIsExpanded(false)
              }}
              disabled={isPending}
              className="animate-in fade-in duration-300"
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}

