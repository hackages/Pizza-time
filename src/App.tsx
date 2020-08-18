import React, {createContext, useEffect, useReducer, useContext, useCallback} from 'react'
import {HommePizzas, PizzaState, Pizza} from './components/pizzas/HomePizzas'
import {Header} from './components/dumb/Header'
import {BasketList} from './components/basket/BasketList'
import {MainDiv} from './components/dumb/style/styleComponents'
import {getPizzas} from './api'

/*
/ This is the main file of app
/ A big part of the logic is done here
/ We use the state store the pizzas and the diffent states of the App
/ Then we use function to handle the changes in the state
*/
interface Basket {
  id: number;
}

interface State {
  isHidden: boolean;
  isLoading: boolean;
  isError: boolean;
  data: Pizza[];
  basket: Basket;
  payed: boolean;
}

interface Action {
  type: string;
  payload?: any;
}

interface AppContextData {
  pizzaState: PizzaState;
  appState: {
    basket: Basket;
    payed: boolean;
  };
  addItem(id: number, quantity: number): void;
  removeItem(id: number, quantity: number): void;
  payBasket(): void;
}

// We use a Global context in this app to pass the infos to the children.
// We would like that you keep that way of doing for the hooks part
export const AppCtx = createContext({} as AppContextData)

// Global state
// hint: using useState when you have too much property can be very messy
// A Reducer could be nice in this case
const initialState: State = {
  isHidden: true,
  isLoading: false,
  isError: false,
  data: [],
  basket: {} as Basket,
  payed: false,
}

const reducer = (state: State, action: Action) => {
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
        data: action.payload
      }
    case 'SHOW_ERROR':
      return {
        ...state,
        isError: true
      }
    case 'SET_HIDDEN':
      return {
        ...state,
        isHidden: action.payload
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

// A stateless component
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // we fetch the pizzas
  useEffect(() => {
    async function loadPizzas() {
      try {
        dispatch({type: 'START_LOADING'})
        const pizzas = await getPizzas()
        dispatch({type: 'ADD_PIZZAS', payload: pizzas})
      } catch {
        dispatch({type: 'SHOW_ERROR'})
      } finally {
        dispatch({type: 'STOP_LOADING'})
      }
    }

    loadPizzas();
  }, [])

  const setIsHidden = useCallback((value: boolean) => {
    dispatch({type: 'SET_HIDDEN', payload: value})
  }, [dispatch])

  const restartTransaction = useCallback(() => {
    dispatch({type: 'RESTART_TRANSACTION'})
  }, [dispatch])

  const addItem = useCallback((id: number, quantity: number) => {
    const oldItem = state.basket[id]
    if (!oldItem) {
      dispatch({type: 'UPDATE_BASKET', payload: {...state.basket, [id]: {quantity}}})
    } else {
      dispatch({
        type: 'UPDATE_BASKET', 
        payload: {...state.basket, [id]: {quantity: oldItem.quantity + quantity}}
      })
    }
  }, [state, dispatch])

  const removeItem = useCallback((id: number, quantity: number) => {
    const oldItem = state.basket[id]
    dispatch({
      type: 'UPDATE_BASKET', 
      payload: {...state.basket, [id]: {quantity: oldItem.quantity - quantity}}
    })
  }, [state, dispatch])

  const payBasket = useCallback(() => {
    dispatch({type: 'PAY_BASKET'})
  }, [])
  
  const {isHidden, isLoading, isError, data, basket, payed} = state
    
  return (
    <AppCtx.Provider
      value={{
        pizzaState: {isLoading, isError, data},
        appState: {basket, payed},
        addItem,
        removeItem,
        payBasket,
      }}
    >
      <div>
        <Header setIsHidden={setIsHidden} isHidden={isHidden} />

        {payed ? (
          <div>
            <h6>Your payement has been accepted see you soon</h6>
            <button
              onClick={() => {
                restartTransaction()
                setIsHidden(true)
              }}
            >
              Make an new order
            </button>
          </div>
        ) : (
          <MainDiv>
            {/* There is nicer way to fetch the data from a context using a hook */}
            <HommePizzas
              isHidden={isHidden}
              addItem={addItem}
            />
            {/* Same than above */}              
            <BasketList
              isHidden={isHidden}
              pizzas={data}
              addItem={addItem}
              removeItem={removeItem}
              basket={basket}
              payBasket={payBasket}
            />
          </MainDiv>
        )}
      </div>
    </AppCtx.Provider>
  )
}

export default App
