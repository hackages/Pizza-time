export const getFormattedPrice = (local: string, currency: string, price: number) => {
  const currencyFormatter = new Intl.NumberFormat(local, {
    style: 'currency',
    currency: currency,
  })
  return currencyFormatter.format(price / 100)
}
