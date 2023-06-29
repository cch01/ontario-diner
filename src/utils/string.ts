import { formatValue } from 'react-currency-input-field'

export const stringToPercentage = (value: string) =>
  Number(value.replaceAll(',', '')) / 100

export const numberToString = (val: number) =>
  formatValue({
    value: val.toString() || '0',
    decimalSeparator: '.',
    decimalScale: 2
  })
