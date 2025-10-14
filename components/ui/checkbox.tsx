'use client'

import { InputHTMLAttributes, forwardRef } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  checked?: boolean
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, ...props }, ref) => {
    return (
      <div className="relative inline-flex items-center">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          ref={ref}
          {...props}
        />
        <div
          className={cn(
            'h-5 w-5 rounded border-2 transition-all cursor-pointer flex items-center justify-center',
            checked
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-transparent'
              : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900',
            className
          )}
        >
          {checked && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
        </div>
      </div>
    )
  }
)
Checkbox.displayName = 'Checkbox'

export { Checkbox }

