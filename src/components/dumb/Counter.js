import React from 'react'
import PropTypes from 'prop-types'
import {MainCounter, CounterButton} from './style/styleComponents'

const propTypes = {
  action: PropTypes.func.isRequired,
  setCount: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
}
export const Counter = ({action, setCount, count}) => {
  return (
    <MainCounter>
      <CounterButton onClick={() => count !== 0 && setCount(count - 1)}>
        -
      </CounterButton>
      <span>{count}</span>
      <CounterButton onClick={() => setCount(count + 1)}>+</CounterButton>
      <CounterButton onClick={action}>Add</CounterButton>
    </MainCounter>
  )
}
Counter.propTypes = propTypes
