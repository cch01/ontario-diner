import { FormInput } from 'types'

import { stringToPercentage } from './string'

export const getDiscountRelatedFields = (
  changedField: string,
  changedValue: string,
  amountAfterTaxes: number,
  values: FormInput
) => {
  const isDiscountPercentageChanged = changedField === 'discountPercentage'

  const discountPercentage = isDiscountPercentageChanged
    ? changedValue
    : values.discountPercentage

  return {
    discountPercentage,
    discountedAmountAfterTax: getAmountAfterDiscount(
      amountAfterTaxes,
      discountPercentage
    )
  }
}

const getAmountAfterDiscount = (
  amountAfterTaxes: number,
  discountPercentage: string
) => {
  return Math.max(
    0,
    amountAfterTaxes * (1 - stringToPercentage(discountPercentage))
  )
}
