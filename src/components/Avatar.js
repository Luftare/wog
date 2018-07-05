import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  display: block;
  height: 80px;
  width: 80px;
  border-radius: 80px;
  background-color: grey;
  background-image: url("${props => props.image}");
  background-size: contain;
  background-image-position: center;
  background-repeat: no-repeat;
  background-image-position: center;
  cursor: pointer;
`;

const Level = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  border-radius: 25px;
  background-color: black;
  color: yellow;
`;

export default class Avatar extends Component {
  render() {
    const { level, avatar } = this.props;
    return (
      <Container image={avatar}>
        <Level>{level}</Level>
      </Container>
    );
  }
}
