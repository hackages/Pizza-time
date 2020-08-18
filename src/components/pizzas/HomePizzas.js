import React from 'react'
import PropTypes from 'prop-types'
import {PizzaList, Title} from '../dumb/style/styleComponents'
import {PizzaDetails} from './PizzaDetails'

const propTypes = {
  isHidden: PropTypes.bool.isRequired,
  pizzaState: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
  addItem: PropTypes.func.isRequired,
}

export const HommePizzas = ({isHidden, pizzaState, addItem}) => {
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

HommePizzas.propTypes = propTypes
