import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: block;
  height: 20px;
  background-color: red;
`;

const Bar = styled.div`
  display: block;
  background-color: green;
  height: 100%;
  transition: all 200ms;
  width: ${props => Math.min(100, Math.max(0, props.ratio * 100))}%;
`;

export default class HpBar extends Component {
  render() {
    return (
      <Container>
        <Bar ratio={this.props.ratio} />
      </Container>
    );
  }
}
