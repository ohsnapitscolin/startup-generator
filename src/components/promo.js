import React from "react";
import styled from "styled-components";
import { Promos } from "../utils/icons";

const PromoWrapper = styled.div`
  position: relative;

  svg {
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
  h1 {
    margin: 0;
  }
`;

export default class Promo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: -1,
      percentOff: 0,
    };
  }

  regenerate() {
    const index = this.getIndex();
    const percentOff = this.getPercentOff();

    this.setState({
      index,
      percentOff,
    });
  }

  getIndex() {
    return Math.floor(Math.random() * Promos.length * 1);
  }

  getPercentOff() {
    return Math.floor(Math.random() * 100) + 1;
  }

  render() {
    const { color } = this.props;
    const { index, percentOff } = this.state;

    const Icon = Promos[index];
    if (!Icon) {
      return <div />;
    }

    return (
      <PromoWrapper color={color}>
        <Icon color={color} />
        <PromoPercentOff>
          <h1>{percentOff}%</h1>
          <h1>OFFFF</h1>
        </PromoPercentOff>
      </PromoWrapper>
    );
  }
}
