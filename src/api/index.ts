import {pizzas} from './pizzas'

// Function used to get the pizzas.
// We use a promise and a setTimeout to simulate an Http Call

export const getPizzas = () =>
  new Promise(resolve => {
    setTimeout(() => resolve(pizzas), 500)
  })
