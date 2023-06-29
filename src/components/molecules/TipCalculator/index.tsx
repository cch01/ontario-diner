import { FormContainer } from 'components/atoms/Form/FormContainer'
import { FormInputItem } from 'components/atoms/Form/FormInputItem'
import { useCallback } from 'react'
import { formatValue } from 'react-currency-input-field'
import { CurrencyInputOnChangeValues } from 'react-currency-input-field/dist/components/CurrencyInputProps'
import { UseFormReset } from 'react-hook-form'
import { FormInput } from 'types'
import { onAnyValueChanged } from 'utils/onValuesChange'

interface TipCalculatorProps {
  values: FormInput
  reset: UseFormReset<FormInput>
}
export const TipCalculator: React.FC<TipCalculatorProps> = ({
  reset,
  values
}) => {
  const getOnValueChange: (
    fieldName: 'tipPercentage' | 'afterTip'
  ) => (
    value: string | undefined,
    name?: string | undefined,
    currencyInputValues?: CurrencyInputOnChangeValues | undefined
  ) => void = useCallback(
    (fieldName: 'tipPercentage' | 'afterTip') => (val) => {
      onAnyValueChanged(
        fieldName,
        formatValue({
          value: val,
          decimalSeparator: '.'
        }),
        values,
        reset
      )
    },
    [values]
  )
  return (
    <FormContainer onRemove={() => null} title="3. Tip">
      <div className="space-y-2">
        <FormInputItem
          value={values.tipPercentage}
          onValueChange={getOnValueChange('tipPercentage')}
          description="Tip percentage"
          suffix=" %"
        />
        <FormInputItem
          description="After tip"
          prefix="$ "
          value={values.afterTip}
          onValueChange={getOnValueChange('afterTip')}
        />
      </div>
    </FormContainer>
  )
}
