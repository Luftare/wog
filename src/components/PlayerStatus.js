import React, { Component } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import HpBar from "./HpBar";

const Container = styled.div`
  position: absolute;
  left: 32px;
  top: 32px;
  display: block;
  width: 100px;
  height: 100px;
  background-color: grey;
`;

@inject("playerStore")
@observer
export default class PlayerStatus extends Component {
  render() {
    const { playerStore } = this.props;

    return (
      <Container>
        <HpBar ratio={playerStore.hpRatio} />
      </Container>
    );
  }
}
