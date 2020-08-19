import React, {
  createContext, 
  useEffect,  
  useCallback
} from 'react'
import {HommePizzas, Pizza} from './components/pizzas/HomePizzas'
import {Header} from './components/dumb/Header'
import {BasketList} from './components/basket/BasketList'
import {MainDiv} from './components/dumb/style/styleComponents'
import { useDispatch, useSelector } from 'react-redux'
import { 
  startLoading,
  addPizzas, 
  showError, 
  stopLoading, 
  setHidden, 
  restart, 
  updateBasket, 
  pay 
} from './actions'
import { State } from './reducers'
import api from './api'

/*
/ This is the main file of app
/ A big part of the logic is done here
/ We use the state store the pizzas and the diffent states of the App
/ Then we use function to handle the changes in the state
*/
export interface Basket {
  [key: number]: {
    quantity: number;
  };
}

interface AppContextData {
  addItem(id: number, quantity: number): void;
  removeItem(id: number, quantity: number): void;
  payBasket(): void;
  setIsHidden(value: boolean): void;
}

// We use a Global context in this app to pass the infos to the children.
// We would like that you keep that way of doing for the hooks part
export const AppCtx = createContext({} as AppContextData)

// Global state
// hint: using useState when you have too much property can be very messy
// A Reducer could be nice in this case


// A stateless component
const App = () => {
  const { 
    basket,
    isHidden, 
    isLoading, 
    payed, 
    data, 
    isError 
  } = useSelector<State, State>(state => state)

  const dispatch = useDispatch()
  // we fetch the pizzas
  useEffect(() => {
    async function loadPizzas() {
      try {
        dispatch(startLoading())
        const response = await api.get<Pizza[]>('/pizzas');
        dispatch(addPizzas(response.data))
      } catch {
        dispatch(showError())
      } finally {
        dispatch(stopLoading())
      }
    }

    loadPizzas();
  }, [])

  const setIsHidden = useCallback((value: boolean) => {
    dispatch(setHidden(value))
  }, [dispatch, setHidden])

  const restartTransaction = useCallback(() => {
    dispatch(restart())
  }, [dispatch, restart])

  const addItem = useCallback((id: number, quantity: number) => {
    const oldItem = basket[id]
    if (!oldItem) {
      dispatch(updateBasket({...basket, [id]: {quantity}}))
    } else {
      dispatch(updateBasket({...basket, [id]: {quantity: oldItem.quantity + quantity}}))
    }
  }, [basket, dispatch, updateBasket])

  const removeItem = useCallback((id: number, quantity: number) => {
    const oldItem = basket[id]
    dispatch(updateBasket({...basket, [id]: {quantity: oldItem.quantity - quantity}}))
  }, [basket, dispatch, updateBasket])

  const payBasket = useCallback(() => {
    dispatch(pay())
  }, [dispatch, pay])
    
  return (
    <AppCtx.Provider
      value={{
        addItem,
        removeItem,
        payBasket,
        setIsHidden
      }}
    >
      <div>
        <Header />

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
              addItem={addItem}
              isHidden={isHidden}
              pizzaState={{
                data,
                isLoading,
                isError
              }}
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
