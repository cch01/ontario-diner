import _isBoolean from 'lodash/isBoolean'
import { FormInput } from 'types'

import { stringToPercentage } from './string'

interface GetDiscountRelatedFieldsInput {
  changedField: string
  changedValue: string | boolean
  salesPrice: number
  taxAmount: number
  values: FormInput
}

export const getDiscountRelatedFields = ({
  changedField,
  changedValue,
  salesPrice,
  taxAmount,
  values
}: GetDiscountRelatedFieldsInput) => {
  if (_isBoolean(changedValue)) {
    const discountPercentage = values.discountPercentage
    return {
      discountPercentage,
      discountedAmountAfterTax: getAmountAfterDiscount({
        salesPrice,
        taxAmount,
        discountPercentage,
        onlyForSalesPrice: changedValue
      })
    }
  }

  const isDiscountPercentageChanged = changedField === 'discountPercentage'

  const discountPercentage = isDiscountPercentageChanged
    ? changedValue
    : values.discountPercentage

  return {
    discountPercentage,
    discountedAmountAfterTax: getAmountAfterDiscount({
      salesPrice,
      taxAmount,
      discountPercentage,
      onlyForSalesPrice: values.onlyForSalesPrice
    })
  }
}

interface GetAmountAfterDiscountInputs {
  salesPrice: number
  taxAmount: number
  discountPercentage: string
  onlyForSalesPrice: boolean
}

const getAmountAfterDiscount = ({
  discountPercentage,
  onlyForSalesPrice,
  salesPrice,
  taxAmount
}: GetAmountAfterDiscountInputs) => {
  const afterDiscount = onlyForSalesPrice
    ? salesPrice * (1 - stringToPercentage(discountPercentage)) + taxAmount
    : (salesPrice + taxAmount) * (1 - stringToPercentage(discountPercentage))

  return Math.max(0, afterDiscount)
}
