import { createStore } from 'redux';
import reducer, { State } from '../reducers';

const initialState = {
  isHidden: true,
  isLoading: false,
  isError: false,
  data: [],
  basket: {},
  payed: false,
}

export const store = createStore(
  reducer,
  initialState
)