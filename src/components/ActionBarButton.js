import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 50px;
  height: 50px;
  background-color: #444;
  color: yellow;
  cursor: pointer;
  border: ${props => (props.active ? "2px solid yellow" : "none")};
  box-shadow: ${props => props.theme.shadow};
  border-radius: 4px;
`;

export default class ActionBarButton extends Component {
  render() {
    const { text, active, onClick } = this.props;
    return (
      <Container onClick={onClick} active={active}>
        {text}
      </Container>
    );
  }
}
