import { 
  SHOW_ERROR, 
  SET_HIDDEN, 
  STOP_LOADING, 
  START_LOADING 
} from '../actions/contants'
import { Action, Reducer } from './index'

const initialState = {
  isHidden: true,
  isLoading: false,
  isError: false
}

const uiReducer: Reducer = {
  [START_LOADING]: state => {
    return {
      ...state,
      isLoading: true
    }
  },
  [STOP_LOADING]: state => {
    return {
      ...state,
      isLoading: false
    }
  },
  [SET_HIDDEN]: (state: any, action: Action) => {
    return {
      ...state,
      isHidden: action.payload as boolean
    }
  },
  [SHOW_ERROR]: state => {
    return {
      ...state,
      isError: true
    }
  }
}

interface UIState {
    isHidden: boolean;
    isLoading: boolean;
    isError: boolean;
}

function reducer(state = initialState, action: Action): UIState {
  const reducerAction = uiReducer[action.type];
  return reducerAction ? reducerAction(state, action) : state;
}

export default reducer;