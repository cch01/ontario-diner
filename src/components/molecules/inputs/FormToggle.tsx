import { Toggle } from 'components/atoms/Toggle'
import React from 'react'

interface FormToggleProps {
  description: string
  value: boolean
  onToggle: (val?: boolean) => void
}

export const FormToggle: React.FC<FormToggleProps> = ({
  description,
  onToggle,
  value
}) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="text-base text-secondary">{description}</div>
      <Toggle onToggle={onToggle} value={value} />
    </div>
  )
}
