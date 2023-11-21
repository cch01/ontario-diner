import _isBoolean from 'lodash/isBoolean'
import { UseFormReset } from 'react-hook-form'
import { FormInput } from 'types'

import { getDiscountRelatedFields } from './discountLogics'
import { getSalesTaxRelatedFields } from './salesTaxLogics'
import { getSplitBillRelatedFields } from './splitBillLogics'
import { numberToString, stringToPercentage } from './string'
import { getTipRelatedFields } from './tipLogics'

export const onAnyValueChanged = (
  changedField: keyof FormInput,
  changedValue: string | boolean,
  values: FormInput,
  reset: UseFormReset<FormInput>
) => {
  if (_isBoolean(changedValue)) {
    if (changedField === 'onlyForSalesPrice') {
      const { amountAfterTaxes, amountBeforeTax, fedTax, provTax } =
        getSalesTaxRelatedFields('', '', values)

      const taxAmount = fedTax + provTax

      const { discountPercentage, discountedAmountAfterTax } =
        getDiscountRelatedFields({
          changedField,
          changedValue,
          taxAmount,
          salesPrice: amountBeforeTax,
          values
        })

      const { afterTip, tipPercentage } = getTipRelatedFields(
        '',
        '',
        discountedAmountAfterTax,
        values
      )

      const { numberOfPerson, payPerPerson } = getSplitBillRelatedFields(
        '',
        '',
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
        onlyForSalesPrice: changedValue
      }

      reset(newValues)
    }
    return
  }

  //NOTE: Hotfix for the library invoking onValueChange on blur
  if (
    !changedValue.endsWith('.') &&
    Number(changedValue) === Number(values[changedField])
  )
    return

  const { amountAfterTaxes, amountBeforeTax, fedTax, provTax } =
    getSalesTaxRelatedFields(changedField, changedValue, values)

  const { discountPercentage, discountedAmountAfterTax } =
    getDiscountRelatedFields({
      changedField,
      changedValue,
      salesPrice: amountBeforeTax,
      taxAmount: fedTax + provTax,
      values
    })

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
    onlyForSalesPrice: values.onlyForSalesPrice,
    tipPercentage,
    afterTip: numberToString(afterTip),
    payPerPerson: numberToString(payPerPerson),
    numberOfPerson,
    [changedField]: changedValue || ''
  }

  reset(newValues)
}
