import { FormContainer } from 'components/atoms/Form/FormContainer'
import { FormInputItem } from 'components/atoms/Form/FormInputItem'
import { FormStaticItem } from 'components/atoms/Form/FormStaticItem'
import { useCallback } from 'react'
import { CurrencyInputOnChangeValues } from 'react-currency-input-field/dist/components/CurrencyInputProps'
import { UseFormReset } from 'react-hook-form'
import { FormInput } from 'types'
import { onAnyValueChanged } from 'utils/onValuesChange'

interface SplitBillCalculatorProps {
  values: FormInput
  reset: UseFormReset<FormInput>
}
export const SplitBillCalculator: React.FC<SplitBillCalculatorProps> = ({
  reset,
  values
}) => {
  const onPersonCountChange: (
    value: string | undefined,
    name?: string | undefined,
    currencyInputValues?: CurrencyInputOnChangeValues | undefined
  ) => void = useCallback(
    (val) => {
      onAnyValueChanged(
        'numberOfPerson',
        parseInt(val && parseInt(val) ? val : '1').toString() || '0',
        values,
        reset
      )
    },
    [reset, values]
  )

  const onClearSection = useCallback(() => {
    onPersonCountChange('1')
  }, [onPersonCountChange])

  return (
    <FormContainer
      title="4. Split the bill"
      onClearSection={onClearSection}
      collapsible
      defaultCollapsed
    >
      <div className="space-y-2">
        <FormInputItem
          value={values.numberOfPerson}
          onValueChange={onPersonCountChange}
          description="Number of people"
          decimalScale={0}
        />
        <FormStaticItem
          description="Amount per person"
          value={values.payPerPerson}
        />
      </div>
    </FormContainer>
  )
}
