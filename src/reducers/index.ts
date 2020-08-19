import { Pizza } from '../components/pizzas/HomePizzas'

export interface State {
  isHidden: boolean;
  isLoading: boolean;
  isError: boolean;
  data: Pizza[];
  basket: any;
  payed: boolean;
}

interface Action {
  type: string;
  payload?: any;
}

function reducer(state: any, action: Action) {
  switch (action.type) {
    case 'START_LOADING':
      return {
        ...state,
        isLoading: true
      }
    case 'STOP_LOADING':
      return {
        ...state,
        isLoading: false
      }
    case 'ADD_PIZZAS':
      return {
        ...state,
        data: [...state.data, ...action.payload] as Pizza[]
      }
    case 'SHOW_ERROR':
      return {
        ...state,
        isError: true
      }
    case 'SET_HIDDEN':
      return {
        ...state,
        isHidden: action.payload as boolean
      }
    case 'RESTART_TRANSACTION':
      return {
        ...state,
        basket: {},
        payed: false
      }
    case 'UPDATE_BASKET':
      return {
        ...state,
        basket: action.payload
      }
    case 'PAY_BASKET':
      return {
        ...state,
        payed: true
      }
    default:
      return state
  }
}

export default reducer;