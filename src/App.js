import React, {Component, createContext} from 'react'
import {HommePizzas} from './components/pizzas/HomePizzas'
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

// We use a Global context in this app to pass the infos to the children.
// We would like that you keep that way of doing for the hooks part
export const AppCtx = createContext()

// A class base component => Change to a stateless component
class App extends Component {
  // Global state
  // hint: using useState when you have too much property can be very messy
  // A Reducer could be nice in this case

  state = {
    isHidden: true,
    isLoading: false,
    isError: false,
    data: [],
    basket: {},
    payed: false,
  }

  // we fetch the pizzas
  // We use the aync await api to handle the promise.
  // You can use .then .catch if you prefer
  // Since this is a lifecycle hook. He is only available in a class component.
  // Thus he will not be available anymore when you will change to a stateless component
  // hint => there is a nice hook that can mimic the same behaviour.

  async componentDidMount() {
    this.setState({isLoading: true})
    try {
      const pizzas = await getPizzas()
      this.setState({data: pizzas})
    } catch (error) {
      this.setState({isError: true})
    } finally {
      this.setState({isLoading: false})
    }
  }

  setIsHidden = value => this.setState({isHidden: value})

  restartTransaction = () => this.setState({basket: {}, payed: false})

  addItem = (id, quantity) => {
    const oldItem = this.state.basket[id]
    if (!oldItem) {
      this.setState(({basket}) => ({basket: {...basket, [id]: {quantity}}}))
    } else {
      this.setState(({basket}) => ({
        basket: {...basket, [id]: {quantity: oldItem.quantity + quantity}},
      }))
    }
  }

  removeItem = (id, quantity) => {
    const oldItem = this.state.basket[id]
    this.setState(({basket}) => ({
      basket: {...basket, [id]: {quantity: oldItem.quantity - quantity}},
    }))
  }

  payBasket = () => {
    this.setState({payed: true})
  }

  render() {
    const {isHidden, isLoading, isError, data, basket, payed} = this.state
    return (
      <AppCtx.Provider
        value={{
          pizzaState: {isLoading, isError, data},
          appState: {basket, payed},
          addItem: this.addItem,
          removeItem: this.removeItem,
          payBasket: this.payBasket,
        }}
      >
        <div>
          <Header setIsHidden={this.setIsHidden} isHidden={isHidden} />

          {payed ? (
            <div>
              <h6>Your payement has been accepted see you soon</h6>
              <button
                onClick={() => {
                  this.restartTransaction()
                  this.setIsHidden(true)
                }}
              >
                Make an new order
              </button>
            </div>
          ) : (
            <MainDiv>
              {/* There is nicer way to fetch the data from a context using a hook */}
              <AppCtx.Consumer>
                {({pizzaState, addItem}) => (
                  <HommePizzas
                    isHidden={isHidden}
                    pizzaState={pizzaState}
                    addItem={addItem}
                  />
                )}
              </AppCtx.Consumer>
              {/* Same than above */}
              <AppCtx.Consumer>
                {({
                  pizzaState: {data},
                  addItem,
                  removeItem,
                  appState: {basket},
                  payBasket,
                }) => (
                  <BasketList
                    isHidden={isHidden}
                    pizzas={data}
                    addItem={addItem}
                    removeItem={removeItem}
                    basket={basket}
                    payBasket={payBasket}
                  />
                )}
              </AppCtx.Consumer>
            </MainDiv>
          )}
        </div>
      </AppCtx.Provider>
    )
  }
}

export default App
