// Function that gives you the total of your basket
// Nothing to do here
export const computeTotalPrice = (basket: any, pizzas: any[]) => {
  if (basket) {
    return Object.keys(basket)
      .map(x => parseInt(x))
      .reduce((acc, current) => {
        const pizza = pizzas.find(pizza => pizza.id === current)
        return acc + pizza.price * basket[current].quantity
      }, 0)
  }

  return 0
}

// Function that gives you each row of the basket
// One row for each type of pizza you ordered
// Nothing to do here
export const computeEachRow = (basket: any, pizzas: any[]) => {
  if (basket) {
    return Object.keys(basket)
      .filter(x => basket[x].quantity !== 0)
      .map(x => parseInt(x))
      .reduce((acc: any, current) => {
        const pizza = pizzas.find(pizza => pizza.id === current)
        return [
          ...acc,
          {
            id: pizza.id,
            name: pizza.name,
            quantity: basket[current].quantity,
            total: basket[current].quantity * pizza.price,
          },
        ]
      }, [])
  }

  return []
}
