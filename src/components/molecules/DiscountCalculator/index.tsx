import { FormContainer } from 'components/atoms/Form/FormContainer'
import { FormInputItem } from 'components/atoms/Form/FormInputItem'
import { FormStaticItem } from 'components/atoms/Form/FormStaticItem'
import { useCallback } from 'react'
import { formatValue } from 'react-currency-input-field'
import { CurrencyInputOnChangeValues } from 'react-currency-input-field/dist/components/CurrencyInputProps'
import { UseFormReset } from 'react-hook-form'
import { FormInput } from 'types'
import { onAnyValueChanged } from 'utils/onValuesChange'

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
          value: val,
          decimalSeparator: '.'
        }),
        values,
        reset
      )
    },
    [values, reset]
  )

  const onClearSection = useCallback(() => {
    getOnValueChange('discountPercentage')('0')
  }, [getOnValueChange])

  return (
    <FormContainer title="2. Discount" onClearSection={onClearSection}>
      <div className="space-y-2">
        <FormInputItem
          value={values.discountPercentage.replaceAll(',', '')}
          onValueChange={getOnValueChange('discountPercentage')}
          description="Discount percentage"
          suffix=" %"
        />
        <FormStaticItem
          description="After discount"
          value={values.discountedAmountAfterTax}
        />
      </div>
    </FormContainer>
  )
}
