import React, { useContext } from 'react'
import {PizzaList, Title} from '../dumb/style/styleComponents'
import {PizzaDetails} from './PizzaDetails'
import { AppCtx } from '../../App'

export interface Pizza {
  id: number;
  name: string;
  price: number;
}

export interface PizzaState {
  isLoading: boolean;
  isError: boolean;
  data: Pizza[];
}

interface HomePizzasProps {
  isHidden: boolean;
  addItem(id: number, quantity: number): void;
}

export const HommePizzas: React.FC<HomePizzasProps> = ({isHidden, addItem}) => {
  const { pizzaState } = useContext(AppCtx)
  const {data: pizzas, isLoading, isError} = pizzaState
  
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <PizzaList isHidden={isHidden}>
      <Title>Pizzas</Title>
      {pizzas.length > 0 ? (
        pizzas.map(pizza => (
          <PizzaDetails key={pizza.id} pizza={pizza} addItem={addItem} />
        ))
      ) : (
        <div>No pizzas</div>
      )}
      {isError && <p>An error occured</p>}
    </PizzaList>
  )
}
