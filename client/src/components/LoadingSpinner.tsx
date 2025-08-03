import React from 'react'
import { clsx } from 'clsx'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className 
}) => {
  return (
    <div
      className={clsx(
        'animate-spin rounded-full border-primary-500',
        {
          'h-4 w-4 border-2': size === 'sm',
          'h-8 w-8 border-2': size === 'md',
          'h-12 w-12 border-4': size === 'lg',
        },
        'border-t-transparent',
        className
      )}
    />
  )
}

export default LoadingSpinner