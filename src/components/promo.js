import React from "react";
import styled from "styled-components";
import { responsive } from "../utils/style";
import { Promos } from "../utils/icons";

const PromoContainer = styled.div`
  position: fixed;
  top: ${p => p.y}px;
  left: ${p => p.x}px;

  z-index: 0;
`;
const PromoWrapper = styled.div`
  position: relative;

  svg {
    height: 125px;
    width: 125px;

    ${responsive.sm`
      height: 200px;
      width: 200px;
    `}

    path,
    g {
      stroke: ${p => p.color};
    }
  }
`;

const PromoPercentOff = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  display: flex;
  flex-direction: column;
  align-items: center;

  transform: translate(-50%, -50%);
  h3 {
    margin: 0;
    font-weight: 400;

    font-size: 16px;
    line-height: 20px;

    ${responsive.sm`
      font-size: 20px;
      line-height: 24px;
    `}
  }
`;

export default class Promo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: -1,
      percentOff: 0,
      x: 0,
      y: 0,
    };

    this.ref = null;
  }

  regenerate() {
    const index = this.getIndex();
    const percentOff = this.getPercentOff();

    this.setState(
      {
        index,
        percentOff,
      },
      () => this.updatePosition()
    );
  }

  updatePosition() {
    if (!this.ref) {
      return;
    }

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    let x = Math.floor(Math.random() * windowWidth);
    let y = Math.floor(Math.random() * windowHeight);

    const promoWidth = this.ref.clientWidth;
    const promoHeight = this.ref.clientHeight;

    x -= promoWidth / 2;
    y -= promoHeight / 2;

    const buffer = 10;

    const maxX = windowWidth - promoWidth - buffer;
    const maxY = windowHeight - promoHeight - buffer;

    x = Math.min(Math.max(x, buffer), maxX);
    y = Math.min(Math.max(y, buffer), maxY);

    this.setState({ x, y });
  }

  getIndex() {
    return Math.floor(Math.random() * Promos.length * 4);
  }

  getPercentOff() {
    return Math.floor(Math.random() * 100) + 1;
  }

  render() {
    const { color } = this.props;
    const { x, y, index, percentOff } = this.state;

    const Icon = Promos[index];
    if (!Icon) {
      return <div />;
    }

    return (
      <PromoContainer x={x} y={y}>
        <PromoWrapper ref={r => (this.ref = r)} color={color}>
          <Icon color={color} />
          <PromoPercentOff>
            <h3>{percentOff}%</h3>
            <h3>OFF</h3>
          </PromoPercentOff>
        </PromoWrapper>
      </PromoContainer>
    );
  }
}
