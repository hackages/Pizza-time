import React, { useContext } from 'react'
import {UserBasket} from '../basket/HeaderBasket'
import {AppCtx} from '../../App'
import {HeaderDiv} from './style/styleComponents'

interface HeaderProps {
  setIsHidden(value: boolean): void;
  isHidden: boolean;
}

export const Header: React.FC<HeaderProps> = ({setIsHidden, isHidden}) => {
  const { pizzaState: { data }, appState: { basket } } = useContext(AppCtx)
  return (
    <HeaderDiv>
      <h2>EAT PIZZAAAAAAA</h2>
      {/* There is nicer way to fetch the data from a context using a hook */}
      <UserBasket
        setIsHidden={setIsHidden}
        basket={basket}
        pizzas={data}
        isHidden={isHidden}
      />
    </HeaderDiv>
  )
}
