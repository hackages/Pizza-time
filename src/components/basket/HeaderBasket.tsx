import React, { useMemo, useContext } from 'react'
import {computeTotalPrice} from '../../helpers/basket'
import {getFormattedPrice} from '../../helpers/currencies'
import {UserBasketDiv, StyledDiv} from '../dumb/style/styleComponents'
import { RootState } from '../../reducers'
import { useSelector } from 'react-redux'
import { AppCtx } from '../../App'

export const UserBasket = () => {
  const { pizza, ui } = useSelector<RootState, RootState>(state => state)
  const { data: pizzas, basket } = pizza;
  const { isHidden } = ui;
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
