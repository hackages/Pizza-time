import React, { useMemo } from 'react'
import {computeTotalPrice} from '../../helpers/basket'
import {getFormattedPrice} from '../../helpers/currencies'
import {UserBasketDiv, StyledDiv} from '../dumb/style/styleComponents'
import { Pizza } from '../pizzas/HomePizzas'

interface UserBasket {
  setIsHidden(hidden: boolean): void;
  basket: any;
  pizzas: Pizza[];
  isHidden: boolean;
}

export const UserBasket: React.FC<UserBasket> = ({setIsHidden, basket, pizzas, isHidden}) => {
  // function that you can find in the helpers folder.
  const total = useMemo(() => {
    return computeTotalPrice(basket, pizzas)
  }, [computeTotalPrice, basket, pizzas])

  const formatedTotal = useMemo(() => {
    return getFormattedPrice('fr', 'EUR', total)
  }, [getFormattedPrice, total])

  return (
    <UserBasketDiv onClick={() => setIsHidden(!isHidden)}>
      <StyledDiv>Basket</StyledDiv>
      <StyledDiv>{formatedTotal}</StyledDiv>
    </UserBasketDiv>
  )
}
