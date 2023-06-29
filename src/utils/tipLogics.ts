import { FormInput } from 'types'

import { stringToPercentage } from './string'

const handleTipFields = ({
  discountedAmountAfterTax,
  tipPercentage,
  afterTip
}: {
  discountedAmountAfterTax: number
  tipPercentage: string
  afterTip?: string
}) => {
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

export const getTipRelatedFields = (
  changedField: string,
  changedValue: string,
  discountedAmountAfterTax: number,
  values: FormInput
) => {
  const isTipPercentageChanged = changedField === 'tipPercentage'

  const tipPercentage = isTipPercentageChanged
    ? changedValue || ''
    : values.tipPercentage

  const isAfterTipChanged = changedField === 'afterTip'

  const afterTip = isAfterTipChanged ? changedValue : values.afterTip

  return handleTipFields({
    discountedAmountAfterTax,
    tipPercentage,
    ...(isAfterTipChanged && { afterTip })
  })
}
