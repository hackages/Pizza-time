import React, { useMemo, useContext } from 'react'
import {computeTotalPrice} from '../../helpers/basket'
import {getFormattedPrice} from '../../helpers/currencies'
import {UserBasketDiv, StyledDiv} from '../dumb/style/styleComponents'
import { State } from '../../reducers'
import { useSelector } from 'react-redux'
import { AppCtx } from '../../App'

export const UserBasket = () => {
  const { data: pizzas, basket, isHidden } = useSelector<State, State>(state => state)
  const { setIsHidden } = useContext(AppCtx)
  
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
