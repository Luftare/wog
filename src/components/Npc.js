import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import { emit } from "../utils/eventBus";
import { EVENT_SHOW_LOOT } from "../constants";
import HpBar from "./HpBar";
import FlyingMessage from "./FlyingMessage";

const Container = styled.div`
  position: relative;
  display: block;
  transition: all 300ms;
  cursor: crosshair;
  ${props =>
    props.dead &&
    `
    cursor: pointer;
  `};
`;

const characterArriveAnimation = keyframes`
  0%, 100% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1, 0.95);
  }
`;

const characterAttackAnimation = keyframes`
  0%, 100% {
    transform: scale(1, 1);
  }
  30% {
    transform: scale(1.2, 1.2) rotateZ(-10deg);
    background-color: red;
  }
`;

const characterDeathAnimation = keyframes`
  0% {
    transform: rotateZ(0);
  }
  80% {
    transform: translateY(-25px) rotateZ(90deg);
  }
  95% {
    transform: scale(1, 0.98) translateY(5px) rotateZ(90deg);
  }
  100% {
    transform: rotateZ(90deg);
  }
`;

const Character = styled.div`
  position: relative;
  animation: ${characterArriveAnimation}
    ${() => Math.floor(Math.random() * 200 + 1000)}ms infinite linear;
  transform-origin: 50% 100%;
  display: block;
  width: 120px;
  height: 120px;
  border-radius: 120px;
  background-image: url("${props => props.image}");
  background-size: contain;
  background-image-position: center;
  background-repeat: no-repeat;
  border: 2px solid transparent;
  box-sizing: border-box;
  transition: all 100ms;
  ${props =>
    props.dead &&
    `
    animation: ${characterDeathAnimation} 600ms
    transform-origin: 50% 50%;
    ${props.noLoot ? "opacity: 0.5;" : ""}
    transform: rotateZ(90deg);
  `};
  :hover {
    box-shadow: 0 0 25px red;
  }
  :active {
    ${props =>
      !props.dead &&
      !props.hitting &&
      `
      background-color: rgba(255, 0, 0, 0.2);
      animation: none;
      transform: scale(0.95, 0.95);
    `};
  }
  ${props => props.aggro && "box-shadow: 0 0 25px red;"}
  ${props => props.hitting && `animation: ${characterAttackAnimation} 200ms;`}
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Shine = styled.img.attrs({
  src: "https://media.giphy.com/media/3IcbXNHDIZQRy/giphy.gif"
})`
  width: 100%;
  pointer-events: none;
  animation: ${fadeIn} 5000ms;
`;

const TopBar = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto 20px;
  margin-bottom: 8px;
  transition: all 600ms;
  ${props =>
    props.hidden
      ? `
    transition: all 150ms 550ms;
    opacity: 0;
  `
      : ""};
`;

const Level = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: yellow;
`;

export default class Npc extends Component {
  handleClick = e => {
    e.preventDefault();
    const { npc } = this.props;
    const isDead = npc.hp <= 0;
    if (!isDead) {
      this.props.onMouseDown();
    } else {
      emit(EVENT_SHOW_LOOT, npc.items);
    }
  };

  render() {
    const { npc } = this.props;
    const hpRatio = npc.hp / npc.maxHp;
    const isDead = npc.hp <= 0;
    const noLoot = !npc.items.find(item => !!item);
    return (
      <Container onMouseDown={this.handleClick} dead={isDead}>
        <TopBar hidden={isDead}>
          <HpBar ratio={hpRatio} />
          <Level>{npc.level}</Level>
        </TopBar>
        <Character
          dead={isDead}
          noLoot={noLoot}
          image={npc.image}
          aggro={npc.aggro}
          hitting={npc.hitting}
        >
          {isDead && !noLoot && <Shine />}
        </Character>
        {npc.messages.map((message, i) => (
          <FlyingMessage
            left={`${Math.floor(Math.random() * 100)}%`}
            top={"50%"}
            key={i}
          >
            {message.value}
          </FlyingMessage>
        ))}
      </Container>
    );
  }
}
