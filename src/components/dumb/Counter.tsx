import React from 'react'
import {MainCounter, CounterButton} from './style/styleComponents'

interface CounterProps {
  action(): void;
  setCount(value: number): void;
  count: number;
}

export const Counter: React.FC<CounterProps> = ({action, setCount, count}) => {
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
