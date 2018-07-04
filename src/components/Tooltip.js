import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  bottom: calc(100% + 8px);
  left: -8px;
  display: flex;
  width: 200px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  transform: translateX(-100%);
  padding: 8px;

  h3 {
    margin: 0 0 8px;
  }
`;

export default class Tooltip extends Component {
  render() {
    const { title, body } = this.props;

    return (
      <Container>
        <h3>{title}</h3>
        <div>{body}</div>
      </Container>
    );
  }
}
