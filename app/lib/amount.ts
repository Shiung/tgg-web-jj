export const parseAmount = (
  amount: string | number | undefined,
  defaultValue: number = 0
): number => {
  if (typeof amount === 'number') {
    return amount
  }
  if (typeof amount === 'string') {
    const parsed = parseFloat(amount)
    return isNaN(parsed) ? defaultValue : parsed
  }
  return defaultValue
}

export function thousandSeparator(numStr: string): string {
  return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function formatKM(num: number) {
  const map = [
    { suffix: 'M', threshold: 1e6, precision: 2 },
    { suffix: 'K', threshold: 1e3, precision: 2 },
    { suffix: '', threshold: 1, precision: 0 },
  ]

  const found = map.find(x => Math.abs(num) >= x.threshold)
  if (found) {
    let formatted = (num / found.threshold).toFixed(found.precision)
    if (found.precision > 0) {
      formatted = parseFloat(formatted).toString()
    }
    formatted = thousandSeparator(formatted)
    return `${formatted}${found.suffix}`
  }

  return thousandSeparator(`${num}`)
}
