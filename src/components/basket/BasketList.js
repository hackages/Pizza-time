import React from 'react'
import PropTypes from 'prop-types'
import {computeEachRow} from '../../helpers/basket'
import {getFormattedPrice} from '../../helpers/currencies'
import {
  ListBasket,
  InsideListBasket,
  TitleBasket,
  CounterButton,
} from '../dumb/style/styleComponents'

// we type the props for the component
const propTypes = {
  isHidden: PropTypes.bool.isRequired,
  basket: PropTypes.object.isRequired,
  pizzas: PropTypes.array.isRequired,
  addItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  payBasket: PropTypes.func.isRequired,
}

export const BasketList = ({
  isHidden,
  basket,
  pizzas,
  addItem,
  removeItem,
  payBasket,
}) => {
  // function that you can find in the helpers folder.
  const basketRowValues = computeEachRow(basket, pizzas)
  return (
    <ListBasket isHidden={isHidden}>
      <TitleBasket>Basket list</TitleBasket>
      {basketRowValues && basketRowValues.length !== 0 ? (
        <CounterButton onClick={() => payBasket()}>Pay</CounterButton>
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

BasketList.propTypes = propTypes
