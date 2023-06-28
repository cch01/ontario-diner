import { FormContainer } from 'components/atoms/Form/FormContainer'
import { FormInputItem } from 'components/atoms/Form/FormInputItem'
import { FormStaticItem } from 'components/atoms/Form/FormStaticItem'
import { Hr } from 'components/atoms/Hr'
import { useCallback } from 'react'
import { formatValue } from 'react-currency-input-field'
import { CurrencyInputOnChangeValues } from 'react-currency-input-field/dist/components/CurrencyInputProps'
import { UseFormReset } from 'react-hook-form'
import { FormInput } from 'types'
import { onAnyValueChanged } from 'utils/onValuesChange'

interface SalesTaxCalculatorProps {
  values: FormInput
  reset: UseFormReset<FormInput>
}

export const SalesTaxCalculator: React.FC<SalesTaxCalculatorProps> = ({
  values,
  reset
}) => {
  const getOnValueChange: (
    fieldName: 'amountBeforeTax' | 'amountAfterTaxes'
  ) => (
    value: string | undefined,
    name?: string | undefined,
    currencyInputValues?: CurrencyInputOnChangeValues | undefined
  ) => void = useCallback(
    (fieldName: 'amountBeforeTax' | 'amountAfterTaxes') => (val) => {
      onAnyValueChanged(
        fieldName,
        formatValue({
          value: val || '0',
          decimalSeparator: '.',
          decimalScale: 2
        }),
        values,
        reset
      )
    },
    [values, reset]
  )

  return (
    <FormContainer onRemove={() => null} title="1. Sales tax">
      <div className="space-y-2">
        <FormInputItem
          value={values.amountBeforeTax}
          onValueChange={getOnValueChange('amountBeforeTax')}
          prefix="$ "
          description="Amount before taxes"
        />
        <Hr />

        <FormStaticItem description="Fed. tax(5%)" value={values.fedTax} />
        <FormStaticItem
          description="Prov. tax(8%)"
          value={formatValue({
            value: values.provTax.replaceAll(',', ''),
            decimalSeparator: '.',
            decimalScale: 2
          })}
        />
        <Hr />

        <FormInputItem
          value={formatValue({
            value: values.amountAfterTaxes.replaceAll(',', ''),
            decimalSeparator: '.',
            decimalScale: 2
          })}
          onValueChange={getOnValueChange('amountAfterTaxes')}
          prefix="$ "
          description="After taxes"
        />
      </div>
    </FormContainer>
  )
}
