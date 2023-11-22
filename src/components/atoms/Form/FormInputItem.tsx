import { useEnterKey } from 'hooks/useEnterKey'
import { useRef } from 'react'
import CurrencyInput from 'react-currency-input-field'
import { CurrencyInputOnChangeValues } from 'react-currency-input-field/dist/components/CurrencyInputProps'

interface FormInputItemProps {
  description: string
  value: string
  suffix?: null | ' %'
  prefix?: '$ ' | null
  decimalScale?: number
  onValueChange: (
    value: string | undefined,
    name?: string | undefined,
    values?: CurrencyInputOnChangeValues | undefined
  ) => void
  selectOnFocus?: boolean
  disabled?: boolean
}
export const FormInputItem: React.FC<FormInputItemProps> = ({
  suffix,
  prefix,
  description,
  value,
  onValueChange,
  decimalScale = 2,
  selectOnFocus = true,
  disabled
}) => {
  const handleFocus: React.FocusEventHandler<HTMLInputElement> = (e) =>
    selectOnFocus && e.target.select()

  const currencyInputRef = useRef<HTMLInputElement>(null)

  useEnterKey(() => {
    currencyInputRef.current?.blur()
  })

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="text-base text-secondary">{description}</div>
      <CurrencyInput
        ref={currencyInputRef}
        {...(suffix && { suffix })}
        {...(prefix && { prefix })}
        decimalsLimit={2}
        step={1}
        allowNegativeValue={false}
        onValueChange={onValueChange}
        value={value.replaceAll(',', '')}
        className="w-24 bg-bg-secondary text-right text-lg font-semibold text-primary"
        decimalSeparator="."
        groupSeparator=","
        decimalScale={decimalScale}
        onFocus={handleFocus}
        disabled={disabled}
      />
    </div>
  )
}
