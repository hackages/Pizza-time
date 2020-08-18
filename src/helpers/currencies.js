export const getFormattedPrice = (local, currency, price) => {
  const currencyFormatter = new Intl.NumberFormat(local, {
    style: 'currency',
    currency: currency,
  })

  return currencyFormatter.format(price / 100)
}
