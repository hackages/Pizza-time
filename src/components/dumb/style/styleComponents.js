import styled from 'styled-components'

export const ListBasket = styled.div`
  display: ${props => (props.isHidden ? 'none' : 'flex')};
  flex-direction: column;
  width: 35%;
  background-color: white;
  border-left: 0.3rem solid #bdbdbd;
  span {
    align-self: center;
  }
`
export const TitleBasket = styled.h4`
  align-self: center;
  color: #673ab7;
`

export const InsideListBasket = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
  div {
    display: flex;
    flex-direction: row;
  }
`

export const UserBasketDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 3rem;
  padding: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #673ab7;
    border-bottom: 5px solid #d1c4e9;
  }
`

export const StyledDiv = styled.div`
  padding: 0.8rem;
  padding: 0.8rem;
`

export const MainCounter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #009688;
  padding: 1rem;
`

export const CounterButton = styled.button`
  margin: 0.5rem;
  background-color: #009688;
  border: 0;
  padding: 0.3rem;
`

export const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #512da8;
  height: 5rem;
  color: #ffffff;
  padding-left: 0.8rem;
  align-items: center;
  box-shadow: 1px 1px 2px #757575;
`

export const PizzaList = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => (props.isHidden ? '100%' : '65%')};
  background-color: white;
`

export const Title = styled.h2`
  align-self: center;
  color: #673ab7;
`

export const PizzaDetailsMain = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #d1c4e9;
  justify-content: space-between;
  margin: 1rem;
`

export const PizzaInfos = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-grow: 1;
  &:hover {
    background-color: #673ab7;
    color: #ffffff;
  }
  height: 100%;
  padding: 1rem;
  cursor: pointer;
  p {
    margin-left: 0.3rem;
  }
`

export const MainDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
