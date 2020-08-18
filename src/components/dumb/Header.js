import React from 'react'
import PropTypes from 'prop-types'
import {UserBasket} from '../basket/HeaderBasket'
import {AppCtx} from '../../App'
import {HeaderDiv} from './style/styleComponents'

const propTypes = {
  setIsHidden: PropTypes.func.isRequired,
  isHidden: PropTypes.bool.isRequired,
}

export const Header = ({setIsHidden, isHidden}) => {
  return (
    <HeaderDiv>
      <h2>EAT PIZZAAAAAAA</h2>
      {/* There is nicer way to fetch the data from a context using a hook */}
      <AppCtx.Consumer>
        {({appState: {basket}, pizzaState: {data}}) => (
          <UserBasket
            setIsHidden={setIsHidden}
            basket={basket}
            pizzas={data}
            isHidden={isHidden}
          />
        )}
      </AppCtx.Consumer>
    </HeaderDiv>
  )
}

Header.propTypes = propTypes
