import { Button } from 'components/atoms/Button'
import { Header } from 'components/atoms/Header'
import { DiscountCalculator } from 'components/molecules/DiscountCalculator'
import { SalesTaxCalculator } from 'components/molecules/SalestaxCalculator'
import { SplitBillCalculator } from 'components/molecules/SplitBillCalculator'
import { TipCalculator } from 'components/molecules/TipCalculator'
import _isEqual from 'lodash/isEqual'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { FormInput } from 'types'

const defaultValues: FormInput = {
  amountBeforeTax: '0',
  amountAfterTaxes: '0',
  fedTax: '0',
  provTax: '0',
  tipPercentage: '0',
  afterTip: '0',
  discountPercentage: '0',
  discountedAmountAfterTax: '0',
  numberOfPerson: '1',
  payPerPerson: '0'
}

const App = () => {
  const { reset, getValues } = useForm<FormInput>({
    defaultValues
  })

  const values = getValues()

  const onResetAll = useCallback(() => {
    reset(defaultValues)
  }, [reset])

  const isResetAllDisabled = _isEqual(values, defaultValues)

  return (
    <div className="flex h-full min-h-screen w-screen flex-col space-y-4 bg-bg-primary p-4">
      <Header />
      <SalesTaxCalculator reset={reset} values={values} />
      <DiscountCalculator reset={reset} values={values} />
      <TipCalculator reset={reset} values={values} />
      <SplitBillCalculator reset={reset} values={values} />
      <Button isDisabled={isResetAllDisabled} onClick={onResetAll}>
        Reset All
      </Button>
    </div>
  )
}

export default App
