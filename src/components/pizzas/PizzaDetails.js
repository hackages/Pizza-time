import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Counter} from '../dumb/Counter'
import {getFormattedPrice} from '../../helpers/currencies'
import {PizzaDetailsMain, PizzaInfos} from '../dumb/style/styleComponents'

const propTypes = {
  pizza: PropTypes.shape({
    id: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  addItem: PropTypes.func.isRequired,
}

export class PizzaDetails extends Component {
  state = {
    count: 0,
  }
  setCount = value => this.setState({count: value})
  render() {
    const {pizza, addItem} = this.props
    const {count} = this.state
    // helpers that put a price in cents in the right format
    // Note : If you check the code of the function
    // you will see that we do quiet expensive calculation to get the value.
    // Thath could lead to performance issues if you get more and more data
    // hint => a Hook give you a way to limit that cost
    const formattedPrice = getFormattedPrice('fr', 'EUR', pizza.price)
    return (
      <PizzaDetailsMain>
        <PizzaInfos onClick={() => addItem(pizza.id, 1)}>
          <p>{pizza.name}</p>
          <p>{formattedPrice}</p>
        </PizzaInfos>
        <Counter
          action={() => {
            addItem(pizza.id, count)
            this.setCount(0)
          }}
          setCount={this.setCount}
          count={count}
        />
      </PizzaDetailsMain>
    )
  }
}

PizzaDetails.propTypes = propTypes
