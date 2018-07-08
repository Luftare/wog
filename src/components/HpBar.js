import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: block;
  height: 20px;
  border: 2px solid ${props => props.theme.smoke};
  box-sizing: border-box;
  border-radius: 4px;
  overflow: hidden;
`;

const Bar = styled.div`
  display: block;
  background-color: ${props => props.theme.green};
  height: 100%;
  transition: all 200ms;
  width: ${props => Math.min(100, Math.max(0, props.ratio * 100))}%;
  border-radius: 4px;
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
