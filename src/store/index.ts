import { createStore } from 'redux';
import { rootReducer} from '../reducers';

const initialState = {
  ui: {
    isHidden: true,
    isLoading: false,
    isError: false
  },
  pizza: {
    data: [],
    basket: {},
    payed: false,
  }
}

export const store = createStore(
  rootReducer,
  initialState
)