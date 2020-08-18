import React from 'react'
import PropTypes from 'prop-types'
import {computeTotalPrice} from '../../helpers/basket'
import {getFormattedPrice} from '../../helpers/currencies'
import {UserBasketDiv, StyledDiv} from '../dumb/style/styleComponents'

const propTypes = {
  setIsHidden: PropTypes.func.isRequired,
  basket: PropTypes.object.isRequired,
  pizzas: PropTypes.array.isRequired,
  isHidden: PropTypes.bool.isRequired,
}

export const UserBasket = ({setIsHidden, basket, pizzas, isHidden}) => {
  // function that you can find in the helpers folder.
  const total = computeTotalPrice(basket, pizzas)
  const formatedTotal = getFormattedPrice('fr', 'EUR', total)
  return (
    <UserBasketDiv onClick={() => setIsHidden(!isHidden)}>
      <StyledDiv>Basket</StyledDiv>
      <StyledDiv>{formatedTotal}</StyledDiv>
    </UserBasketDiv>
  )
}

UserBasket.propTypes = propTypes
