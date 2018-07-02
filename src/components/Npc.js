import React, { Component } from "react";
import styled from "styled-components";
import HpBar from "./HpBar";

const Container = styled.div`
  display: block;
  width: 100px;
  height: 100px;
  background-color: pink;
`;

export default class Npc extends Component {
  render() {
    const hpRatio = this.props.npc.hp / this.props.npc.maxHp;
    return (
      <Container onMouseDown={this.props.onMouseDown}>
        <HpBar ratio={hpRatio} />
      </Container>
    );
  }
}
