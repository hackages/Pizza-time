import React, { useMemo } from 'react'
import {computeEachRow} from '../../helpers/basket'
import {getFormattedPrice} from '../../helpers/currencies'
import {
  ListBasket,
  InsideListBasket,
  TitleBasket,
  CounterButton,
} from '../dumb/style/styleComponents'
import { Pizza } from '../pizzas/HomePizzas'

interface BasketListProps {
  isHidden: boolean;
  basket: any;
  pizzas: Pizza[];
  addItem(id: number, quantity: number): void;
  removeItem(id: number, quantity: number): void;
  payBasket(): void;
}

interface BasketRow {
  id: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

export const BasketList: React.FC<BasketListProps> = ({
  isHidden,
  basket,
  pizzas,
  addItem,
  removeItem,
  payBasket,
}) => {
  // function that you can find in the helpers folder.
  const basketRowValues: BasketRow[] = useMemo(() => {
    return computeEachRow(basket, pizzas)
  }, [computeEachRow, basket, pizzas])

  return (
    <ListBasket isHidden={isHidden}>
      <TitleBasket>Basket list</TitleBasket>
      {basketRowValues && basketRowValues.length !== 0 ? (
        <CounterButton onClick={payBasket}>Pay</CounterButton>
      ) : (
        <span>No item in the basket yet</span>
      )}

      {basketRowValues.map(row => (
        <InsideListBasket key={row.name + row.price}>
          <p>{row.name}</p>
          <div>
            <CounterButton
              onClick={() => {
                removeItem(row.id, 1)
              }}
            >
              -
            </CounterButton>
            <p>{row.quantity}</p>
            <CounterButton
              onClick={() => {
                addItem(row.id, 1)
              }}
            >
              +
            </CounterButton>
          </div>
          <p>{getFormattedPrice('fr', 'EUR', row.total)}</p>
          <CounterButton
            onClick={() => {
              removeItem(row.id, row.quantity)
            }}
          >
            Delete
          </CounterButton>
        </InsideListBasket>
      ))}
    </ListBasket>
  )
}
