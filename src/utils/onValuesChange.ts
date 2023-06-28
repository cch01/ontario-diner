import { formatValue } from 'react-currency-input-field'
import { UseFormReset } from 'react-hook-form'
import { FormInput } from 'types'

const stringToPercentage = (value: string) =>
  Number(value.replaceAll(',', '')) / 100

const numberToString = (val: number) =>
  formatValue({
    value: val.toString() || '0',
    decimalSeparator: '.',
    decimalScale: 2
  })

const getAmountBeforeTax = (
  amountBeforeTax?: string,
  amountAfterTaxes?: string
) => {
  if (amountBeforeTax) return Number(amountBeforeTax.replaceAll(',', ''))
  if (amountAfterTaxes) {
    return Number(amountAfterTaxes.replaceAll(',', '')) / 1.13
  }

  throw 'Either one must be passed in'
}

const calculateTaxes = ({
  amountBeforeTax,
  amountAfterTaxes
}: {
  amountBeforeTax?: string
  amountAfterTaxes?: string
}) => {
  const newBeforeTaxes = getAmountBeforeTax(amountBeforeTax, amountAfterTaxes)

  const fedTax = newBeforeTaxes * 0.05

  const provTax = newBeforeTaxes * 0.08

  const afterTaxes = newBeforeTaxes + fedTax + provTax

  return {
    amountBeforeTax: newBeforeTaxes,
    amountAfterTaxes: afterTaxes,
    fedTax: fedTax,
    provTax: provTax
  }
}

const getAmountAfterDiscount = (
  amountAfterTaxes: number,
  discountPercentage: string
) => {
  return amountAfterTaxes * (1 - stringToPercentage(discountPercentage))
}

const getAmountAfterTip = ({
  discountedAmountAfterTax,
  tipPercentage,
  afterTip
}: {
  discountedAmountAfterTax: number
  tipPercentage: string
  afterTip?: string
}) => {
  if (!tipPercentage && !afterTip)
    throw 'Either tipPercentage or afterTip must be passed in'

  const newAfterTip = afterTip
    ? Number(afterTip.replaceAll(',', ''))
    : discountedAmountAfterTax * (1 + stringToPercentage(tipPercentage))

  const newTipPercentage = afterTip
    ? (
        (Number(afterTip.replaceAll(',', '')) / discountedAmountAfterTax - 1) *
        100
      ).toFixed(2)
    : tipPercentage

  return {
    afterTip: newAfterTip,
    tipPercentage: newTipPercentage
  }
}

export const onAnyValueChanged = (
  changedField: keyof FormInput,
  changedValue: string,
  values: FormInput,
  reset: UseFormReset<FormInput>
) => {
  const isAmountAfterTaxesChanged = changedField === 'amountAfterTaxes'
  const isAmountBeforeTaxesChanged = changedField === 'amountBeforeTax'

  const taxRelatedFields = calculateTaxes({
    amountAfterTaxes: values.amountAfterTaxes,

    ...(isAmountAfterTaxesChanged && {
      amountAfterTaxes: changedValue
    }),
    ...(isAmountBeforeTaxesChanged && {
      amountBeforeTax: changedValue
    })
  })

  const isDiscountPercentageChanged = changedField === 'discountPercentage'

  const discountPercentage = isDiscountPercentageChanged
    ? changedValue
    : values.discountPercentage

  const discountedAmountAfterTax = getAmountAfterDiscount(
    taxRelatedFields.amountAfterTaxes,
    discountPercentage
  )

  const isTipPercentageChanged = changedField === 'tipPercentage'

  const tipPercentage = isTipPercentageChanged
    ? changedValue
    : values.tipPercentage

  const isAfterTipChanged = changedField === 'afterTip'

  const afterTip = isAfterTipChanged ? changedValue : values.afterTip

  const tipRelatedFields = getAmountAfterTip({
    discountedAmountAfterTax,
    tipPercentage,
    ...(isAfterTipChanged && { afterTip })
  })

  const isNumberOfPersonChanged = changedField === 'numberOfPerson'

  const numberOfPerson = isNumberOfPersonChanged
    ? changedValue
    : values.numberOfPerson

  const amountPerPerson = tipRelatedFields.afterTip / Number(numberOfPerson)

  const newValues: FormInput = {
    amountBeforeTax: numberToString(taxRelatedFields.amountBeforeTax),
    fedTax: numberToString(taxRelatedFields.fedTax),
    provTax: numberToString(taxRelatedFields.provTax),
    amountAfterTaxes: numberToString(taxRelatedFields.amountAfterTaxes),
    discountedAmountAfterTax: numberToString(discountedAmountAfterTax),
    discountPercentage: numberToString(
      stringToPercentage(discountPercentage) * 100
    ),
    tipPercentage: tipRelatedFields.tipPercentage,
    afterTip: numberToString(tipRelatedFields.afterTip),
    payPerPerson: numberToString(amountPerPerson),
    numberOfPerson
  }

  reset(newValues)
}
