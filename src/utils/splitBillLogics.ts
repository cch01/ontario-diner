import { FormInput } from 'types'

export const getSplitBillRelatedFields = (
  changedField: string,
  changedValue: string,
  afterTip: number,
  values: FormInput
) => {
  const isNumberOfPersonChanged = changedField === 'numberOfPerson'

  const numberOfPerson = isNumberOfPersonChanged
    ? changedValue
    : values.numberOfPerson

  return {
    payPerPerson: afterTip / Number(numberOfPerson),
    numberOfPerson
  }
}
