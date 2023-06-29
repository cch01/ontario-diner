import { FormInput } from 'types'

export const getSalesTaxRelatedFields = (
  changedField: string,
  changedValue: string,
  values: FormInput
) => {
  const isAmountAfterTaxesChanged = changedField === 'amountAfterTaxes'
  const amountAfterTaxes = isAmountAfterTaxesChanged
    ? changedValue
    : values.amountAfterTaxes
  const isAmountBeforeTaxesChanged = changedField === 'amountBeforeTax'
  const amountBeforeTax = isAmountBeforeTaxesChanged
    ? changedValue
    : values.amountBeforeTax

  return calculateTaxes({
    amountAfterTaxes,
    amountBeforeTax,
    isAmountAfterTaxesChanged
  })
}

const calculateTaxes = ({
  amountBeforeTax,
  amountAfterTaxes,
  isAmountAfterTaxesChanged
}: {
  amountBeforeTax: string
  amountAfterTaxes: string
  isAmountAfterTaxesChanged: boolean
}) => {
  if (!amountBeforeTax && !amountAfterTaxes)
    return {
      amountBeforeTax: 0,
      amountAfterTaxes: 0,
      fedTax: 0,
      provTax: 0
    }

  const newBeforeTaxes = getAmountBeforeTax(
    amountBeforeTax,
    amountAfterTaxes,
    isAmountAfterTaxesChanged
  )

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

const getAmountBeforeTax = (
  amountBeforeTax: string,
  amountAfterTaxes: string,
  isAmountAfterTaxesChanged: boolean
) => {
  if (isAmountAfterTaxesChanged) {
    return Number(amountAfterTaxes.replaceAll(',', '')) / 1.13
  }
  return Number(amountBeforeTax.replaceAll(',', ''))
}
