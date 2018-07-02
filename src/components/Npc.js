import React, { Component } from "react";
import styled from "styled-components";
import HpBar from "./HpBar";

const Container = styled.div`
  display: block;
  width: 100px;
  height: 100px;
  background-color: lightgrey;
  transition: all 300ms;
  ${props =>
    props.dead &&
    `
    background-color: grey;
    pointer-events: none;
    transform: rotate(90deg);
  `};
`;

export default class Npc extends Component {
  render() {
    const { npc } = this.props;
    const hpRatio = npc.hp / npc.maxHp;
    return (
      <Container onMouseDown={this.props.onMouseDown} dead={npc.hp <= 0}>
        <HpBar ratio={hpRatio} />
        <div>{npc.name}</div>
      </Container>
    );
  }
}
