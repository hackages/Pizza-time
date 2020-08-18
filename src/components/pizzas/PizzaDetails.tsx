import React, {useState, useMemo} from 'react'
import {Counter} from '../dumb/Counter'
import {getFormattedPrice} from '../../helpers/currencies'
import {PizzaDetailsMain, PizzaInfos} from '../dumb/style/styleComponents'
import { Pizza } from './HomePizzas'

interface PizzaDetailsProps {
  pizza: Pizza;
  addItem(id: number, quantity: number): void;
}

export const PizzaDetails: React.FC<PizzaDetailsProps> = ({ pizza, addItem }) => {
  const [count, setCount] = useState(0)
  
  const formattedPrice = useMemo(() => {
    return getFormattedPrice('fr', 'EUR', pizza.price)
  }, [getFormattedPrice, pizza.price])

  return (
    <PizzaDetailsMain>
      <PizzaInfos onClick={() => addItem(pizza.id, 1)}>
        <p>{pizza.name}</p>
        <p>{formattedPrice}</p>
      </PizzaInfos>
      <Counter
        action={() => {
          addItem(pizza.id, count)
          setCount(0)
        }}
        setCount={setCount}
        count={count}
      />
    </PizzaDetailsMain>
  )
}
