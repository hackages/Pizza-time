import React from 'react'
import {UserBasket} from '../basket/HeaderBasket'
import {HeaderDiv} from './style/styleComponents'

export const Header = () => {
  return (
    <HeaderDiv>
      <h2>EAT PIZZAAAAAAA</h2>
      <UserBasket />
    </HeaderDiv>
  )
}
