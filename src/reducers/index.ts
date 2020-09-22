import { Pizza } from '../components/pizzas/HomePizzas'
import { combineReducers } from 'redux'
import pizzaReducer from './PizzaReducer'
import uiReducer from './UIReducer'

export interface State {
  isHidden: boolean;
  isLoading: boolean;
  isError: boolean;
  data: Pizza[];
  basket: any;
  payed: boolean;
}

export interface Action {
  type: string;
  payload?: any;
}

export interface Reducer {
  [key: string]: (state: any, action: Action) => any;
}

export const rootReducer = combineReducers({
  pizza: pizzaReducer,
  ui: uiReducer
});

export type RootState = ReturnType<typeof rootReducer>;