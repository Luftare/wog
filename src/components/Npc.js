import React, { Component } from "react";
import styled from "styled-components";
import HpBar from "./HpBar";
import DroppedItems from "./DroppedItems";
import FlyingMessage from "./FlyingMessage";

const Container = styled.div`
  position: relative;
  display: block;
  width: 100px;
  height: 100px;
  background-color: lightgrey;
  transition: all 300ms;
  cursor: crosshair;
  ${props =>
    props.dead &&
    `
    cursor: default;
    background-color: grey;
    pointer-events: none;
    transform: rotate(0deg);
  `};
`;

export default class Npc extends Component {
  handleClick = () => {
    const { npc } = this.props;
    const isDead = npc.hp <= 0;
    if (isDead) return;
    this.props.onMouseDown();
  };

  render() {
    const { npc } = this.props;
    const hpRatio = npc.hp / npc.maxHp;
    const isDead = npc.hp <= 0;
    return (
      <Container onMouseDown={this.handleClick} dead={isDead}>
        {isDead && <DroppedItems items={npc.items} />}
        <HpBar ratio={hpRatio} />
        <div>
          {npc.name} {npc.level}
        </div>
        <div>{npc.aggro ? "aggro" : null}</div>
        {npc.messages.map((message, i) => (
          <FlyingMessage left={`${Math.floor(Math.random() * 100)}%`} key={i}>
            {message.value}
          </FlyingMessage>
        ))}
      </Container>
    );
  }
}
