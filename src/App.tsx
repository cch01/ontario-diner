import { Header } from 'components/atoms/Header'
import { DiscountCalculator } from 'components/molecules/DiscountCalculator'
import { DiscountCalculatorField } from 'components/molecules/DiscountCalculator/types'
import { SalesTaxCalculator } from 'components/molecules/SalestaxCalculator'
import { SalesTaxCalculatorField } from 'components/molecules/SalestaxCalculator/types'
import { SplitBillCalculator } from 'components/molecules/SplitBillCalculator'
import { SplitBillCalculatorField } from 'components/molecules/SplitBillCalculator/types'
import { TipCalculator } from 'components/molecules/TipCalculator'
import { TipCalculatorField } from 'components/molecules/TipCalculator/types'
import { useMemo } from 'react'
import { Control, useForm, useWatch } from 'react-hook-form'
import { FormInput } from 'types'

const defaultValues: FormInput = {
  amountBeforeTax: '176.99',
  amountAfterTaxes: '200',
  fedTax: '8.85',
  provTax: '14.16',
  tipPercentage: '15',
  afterTip: '207',
  discountPercentage: '10',
  discountedAmountAfterTax: '180',
  numberOfPerson: '3',
  payPerPerson: '69'
}

const App = () => {
  const { reset, watch } = useForm<FormInput>({
    defaultValues
  })

  const values = useMemo(() => watch(), [watch()])

  return (
    <div className="flex h-full min-h-screen w-screen flex-col space-y-4 bg-bg-primary p-4">
      <Header />
      <SalesTaxCalculator reset={reset} values={values} />
      <DiscountCalculator reset={reset} values={values} />
      <TipCalculator reset={reset} values={values} />
      <SplitBillCalculator reset={reset} values={values} />
    </div>
  )
}

export default App
