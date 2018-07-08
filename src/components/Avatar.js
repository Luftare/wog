import React, { Component } from "react";
import styled from "styled-components";
import FlyingMessage from "./FlyingMessage";

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
  box-shadow: ${props => (props.inFight ? "inset 0 0 25px red" : "none")};
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
  background-color: ${props => props.theme.black};
  color: yellow;
  font-weight: bold;
`;

export default class Avatar extends Component {
  render() {
    const { level, avatar, inFight, messages } = this.props;
    return (
      <Container image={avatar} inFight={inFight}>
        {messages.map((msg, i) => (
          <FlyingMessage
            key={i}
            left={`50%`}
            top={"50%"}
            color={msg.color}
            big={msg.big}
          >
            {msg.value}
          </FlyingMessage>
        ))}
        <Level>{level}</Level>
      </Container>
    );
  }
}
