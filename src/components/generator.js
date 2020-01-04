import React from "react"
import styled from "styled-components"
import { responsive } from "../utils/style";

const Container = styled.div`
  height: 100%;
  width: 100%;

  padding: 32px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: #${p => p.color};
  background-color: black;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${responsive.sm`
    flex-direction: row;
  `}

  font-size: 48px;
  ${responsive.sm`
    font-size: 64px;
  `}

  p {
    text-align: center;
    margin: 0;
  }

  margin-bottom: 48px;
`;

const GoButton = styled.button`
  outline: none;
  border: none;
  &:focus {
    outline: none;
  }

  text-transform: uppercase;

  font-size: 16px;
  font-weight: 500;

  background-color: #${p => p.color};
  width: 250px;
  height: 55px;
  border-radius: 50px;

  &:hover {
    cursor: pointer;
  }
`;

export default class Generator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      item: null,
      thing: null,
      color: "FFFFFF",
      stroke: "FFFFFF"
    }
  }

  componentDidMount() {
    this.regenerate();
  }

  regenerate() {
    const newColor = this.getNewColor(this.state.color);
    const newItem = this.getNewItem(this.state.item);
    const newThing = this.getNewThing(this.state.thing);
    const stroke = this.getNewColor(newColor);

    this.setState({
      item: newItem,
      thing: newThing,
      color: newColor,
      stroke: stroke
    });
  }

  getNewColor(currentValue) {
    return this.getRandomValue(currentValue, this.props.colors);
  }

  getNewItem(currentValue) {
    return this.getRandomValue(currentValue, this.props.items);
  }

  getNewThing(currentValue) {
    return this.getRandomValue(currentValue, this.props.things);
  }

  getRandomValue(currentValue, array) {
    const copiedArray = [...array];
    const currentIndex = copiedArray.indexOf(currentValue);

    if (currentIndex > -1) {
      copiedArray.splice(currentIndex, 1);
    }

    const newIndex =  Math.floor(Math.random() * copiedArray.length);
    return copiedArray[newIndex];
  }

  render() {
    const { item, thing, color, stroke } = this.state;

    return (
      <Container color={color}>
        {item &&
          <>
            <TextWrapper>
              <p>{`${item} but for ${thing}`}</p>
            </TextWrapper>
            <GoButton
              color={color}
              stroke={stroke}
              onClick={this.regenerate.bind(this)}
            >
              Let's Go
            </GoButton>
          </>
        }
      </Container>
    );
  }
}
