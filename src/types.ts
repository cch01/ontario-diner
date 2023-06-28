import { DiscountCalculatorField } from 'components/molecules/DiscountCalculator/types'
import { SalesTaxCalculatorField } from 'components/molecules/SalestaxCalculator/types'
import { SplitBillCalculatorField } from 'components/molecules/SplitBillCalculator/types'
import { TipCalculatorField } from 'components/molecules/TipCalculator/types'

export type FormInput = SalesTaxCalculatorField &
  TipCalculatorField &
  DiscountCalculatorField &
  SplitBillCalculatorField
