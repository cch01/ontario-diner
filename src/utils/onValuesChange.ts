import { UseFormReset } from 'react-hook-form'
import { FormInput } from 'types'

import { getDiscountRelatedFields } from './discountLogics'
import { getSalesTaxRelatedFields } from './salesTaxLogics'
import { getSplitBillRelatedFields } from './splitBillLogics'
import { numberToString, stringToPercentage } from './string'
import { getTipRelatedFields } from './tipLogics'

export const onAnyValueChanged = (
  changedField: keyof FormInput,
  changedValue: string,
  values: FormInput,
  reset: UseFormReset<FormInput>
) => {
  //NOTE: Hotfix for the library invoking onValueChange on blur
  if (Number(changedValue) === Number(values[changedField])) return

  const { amountAfterTaxes, amountBeforeTax, fedTax, provTax } =
    getSalesTaxRelatedFields(changedField, changedValue, values)

  const { discountPercentage, discountedAmountAfterTax } =
    getDiscountRelatedFields(
      changedField,
      changedValue,
      amountAfterTaxes,
      values
    )

  const { afterTip, tipPercentage } = getTipRelatedFields(
    changedField,
    changedValue,
    discountedAmountAfterTax,
    values
  )

  const { numberOfPerson, payPerPerson } = getSplitBillRelatedFields(
    changedField,
    changedValue,
    afterTip,
    values
  )

  const newValues: FormInput = {
    amountBeforeTax: numberToString(amountBeforeTax),
    fedTax: numberToString(fedTax),
    provTax: numberToString(provTax),
    amountAfterTaxes: numberToString(amountAfterTaxes),
    discountedAmountAfterTax: numberToString(discountedAmountAfterTax),
    discountPercentage: numberToString(
      stringToPercentage(discountPercentage) * 100
    ),
    tipPercentage,
    afterTip: numberToString(afterTip),
    payPerPerson: numberToString(payPerPerson),
    numberOfPerson,
    [changedField]: changedValue || ''
  }

  reset(newValues)
}
