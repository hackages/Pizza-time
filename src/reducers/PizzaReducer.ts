import { 
  PAY_BASKET,
  UPDATE_BASKET, 
  RESTART_TRANSACTION, 
  ADD_PIZZAS 
} from '../actions/contants'
import { Action, Reducer } from './index'
import { Pizza } from '../components/pizzas/HomePizzas'
import { Basket } from '../App'

const initialState = {
  data: [] as Pizza[],
  basket: {},
  payed: false,
}

const pizzaReducer: Reducer = {
  [ADD_PIZZAS]: (state, action: Action) => {
    return {
      ...state,
      data: [...state.data, ...action.payload] as Pizza[]
    }
  },
  [RESTART_TRANSACTION]: state => {
    return {
      ...state,
      basket: {},
      payed: false
    }
  },
  [UPDATE_BASKET]: (state, action: Action) => {
    return {
      ...state,
      basket: action.payload
    }
  },
  [PAY_BASKET]: state => {
    return {
      ...state,
      payed: true
    }
  }
}

interface PizzaState {
    data: Pizza[];
    basket: Basket;
    payed: boolean;
}

function reducer(state = initialState, action: Action): PizzaState {
  const reducerAction = pizzaReducer[action.type];
  return reducerAction ? reducerAction(state, action) : state;
}

export default reducer;