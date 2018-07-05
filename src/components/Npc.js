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
    transform: scale(1, 0.9);
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
  animation: ${characterArriveAnimation} 1200ms infinite linear;
  transform-origin: 50% 100%;
  display: block;
  width: 100px;
  height: 120px;
  background-color: lightblue;
  transition: all 200ms;
  ${props =>
    props.dead &&
    `
    animation: ${characterDeathAnimation} 600ms
    transform-origin: 50% 50%;
    ${props.noLoot ? "filter: grayscale(100%);" : ""}
    transform: rotateZ(90deg);
  `};
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
    transition: all 200ms 500ms;
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
    const isRightClick = e.nativeEvent.which === 3;
    const isLeftClick = e.nativeEvent.which === 1;
    const { npc } = this.props;
    const isDead = npc.hp <= 0;
    if (!isDead && isLeftClick) {
      this.props.onMouseDown();
    } else if (isRightClick) {
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
        <Character dead={isDead} noLoot={noLoot} />
        {npc.messages.map((message, i) => (
          <FlyingMessage left={`${Math.floor(Math.random() * 100)}%`} key={i}>
            {message.value}
          </FlyingMessage>
        ))}
      </Container>
    );
  }
}
