import { Pizza } from '../components/pizzas/HomePizzas';
import { Basket } from '../App';

export const startLoading = () => {
  return {
    type: 'START_LOADING'
  }
};

export const addPizzas = (pizzas: Pizza[]) => {
  return {
    type: 'ADD_PIZZAS', 
    payload: pizzas
  }
}

export const showError = () => {
  return {
    type: 'SHOW_ERROR'
  }
}

export const stopLoading = () => {
  return {
    type: 'STOP_LOADING'
  }
}

export const setHidden = (hidden: boolean) => {
  return {
    type: 'SET_HIDDEN',
    payload: hidden
  }
}

export const restart = () => {
  return {
    type: 'RESTART_TRANSACTION'
  }
}

export const updateBasket = (basket: Basket) => {
  return {
    type: 'UPDATE_BASKET',
    payload: basket
  }
}

export const pay = () => {
  return {
    type: 'PAY_BASKET'
  }
}