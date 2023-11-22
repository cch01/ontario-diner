import { FormContainer } from 'components/atoms/Form/FormContainer'
import { FormInputItem } from 'components/atoms/Form/FormInputItem'
import { FormStaticItem } from 'components/atoms/Form/FormStaticItem'
import _isBoolean from 'lodash/isBoolean'
import { useCallback } from 'react'
import { formatValue } from 'react-currency-input-field'
import { CurrencyInputOnChangeValues } from 'react-currency-input-field/dist/components/CurrencyInputProps'
import { UseFormReset } from 'react-hook-form'
import { FormInput } from 'types'
import { onAnyValueChanged } from 'utils/onValuesChange'

import { FormToggle } from '../inputs/FormToggle'

interface DiscountCalculatorProps {
  values: FormInput
  reset: UseFormReset<FormInput>
}
export const DiscountCalculator: React.FC<DiscountCalculatorProps> = ({
  reset,
  values
}) => {
  const getOnValueChange: (
    fieldName:
      | 'discountPercentage'
      | 'discountedAmountAfterTax'
      | 'onlyForSalesPrice'
  ) => (
    value: string | boolean | undefined,
    name?: string | undefined,
    currencyInputValues?: CurrencyInputOnChangeValues | undefined
  ) => void = useCallback(
    (
        fieldName:
          | 'discountPercentage'
          | 'discountedAmountAfterTax'
          | 'onlyForSalesPrice'
      ) =>
      (val) => {
        if (_isBoolean(val)) {
          if (fieldName === 'onlyForSalesPrice') {
            onAnyValueChanged(fieldName, val, values, reset)
          }
          return
        }

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

  const onToggleDiscountMode = useCallback(() => {
    getOnValueChange('onlyForSalesPrice')(!values.onlyForSalesPrice)
  }, [getOnValueChange, values.onlyForSalesPrice])

  return (
    <FormContainer
      title="2. Discount"
      onClearSection={onClearSection}
      collapsible
      defaultCollapsed
    >
      <div className="space-y-2">
        <FormInputItem
          value={values.discountPercentage.replaceAll(',', '')}
          onValueChange={getOnValueChange('discountPercentage')}
          description="Discount percentage"
          suffix=" %"
        />
        <FormToggle
          description="Only for sales price"
          onToggle={onToggleDiscountMode}
          value={values.onlyForSalesPrice}
        />
        <FormStaticItem
          description="After discount"
          value={values.discountedAmountAfterTax}
        />
      </div>
    </FormContainer>
  )
}
