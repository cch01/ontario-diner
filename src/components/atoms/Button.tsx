import clsx from 'clsx'
import React, { memo } from 'react'

interface ButtonProps {
  children: React.ReactNode | string
  onClick: React.MouseEventHandler<HTMLButtonElement>
  isDisabled?: boolean
}

export const Button: React.FC<ButtonProps> = memo(
  ({ children, onClick, isDisabled }) => {
    const child =
      typeof children === 'string' ? (
        <div
          className={clsx(
            'font-semibold',
            isDisabled ? 'text-tertiary' : 'text-highlight'
          )}
        >
          {children}
        </div>
      ) : (
        children
      )

    return (
      <button
        onClick={onClick}
        className={clsx(
          `rounded-md border border-border p-2`,
          isDisabled
            ? 'cursor-not-allowed bg-bg-alternative'
            : 'bg-bg-tertiaryHover'
        )}
      >
        {child}
      </button>
    )
  }
)

Button.displayName = 'Button'
