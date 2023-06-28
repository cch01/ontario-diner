import { FormContainer } from 'components/atoms/Form/FormContainer'
import { FormInputItem } from 'components/atoms/Form/FormInputItem'
import { FormStaticItem } from 'components/atoms/Form/FormStaticItem'
import { useCallback, useMemo } from 'react'
import { formatValue } from 'react-currency-input-field'
import { CurrencyInputOnChangeValues } from 'react-currency-input-field/dist/components/CurrencyInputProps'
import { Control, useController, UseFormReset } from 'react-hook-form'
import { FormInput } from 'types'
import { onAnyValueChanged } from 'utils/onValuesChange'

import { DiscountCalculatorField } from './types'

interface DiscountCalculatorProps {
  values: FormInput
  reset: UseFormReset<FormInput>
}
export const DiscountCalculator: React.FC<DiscountCalculatorProps> = ({
  reset,
  values
}) => {
  const getOnValueChange: (
    fieldName: 'discountPercentage' | 'discountedAmountAfterTax'
  ) => (
    value: string | undefined,
    name?: string | undefined,
    currencyInputValues?: CurrencyInputOnChangeValues | undefined
  ) => void = useCallback(
    (fieldName: 'discountPercentage' | 'discountedAmountAfterTax') => (val) => {
      onAnyValueChanged(
        fieldName,
        formatValue({
          value: val || '0',
          decimalSeparator: '.'
        }),
        values,
        reset
      )
    },
    [values]
  )
  return (
    <FormContainer onRemove={() => null} title="2. Discount">
      <div className="space-y-2">
        <FormInputItem
          value={values.discountPercentage.replaceAll(',', '')}
          onValueChange={getOnValueChange('discountPercentage')}
          description="Discount percentage"
          suffix=" %"
        />
        <FormStaticItem
          description="After discount"
          value={formatValue({
            value: values.discountedAmountAfterTax.replaceAll(',', ''),
            decimalSeparator: '.',
            decimalScale: 2
          })}
        />
      </div>
    </FormContainer>
  )
}
