import React, { Component } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import HpBar from "./HpBar";
import Avatar from "./Avatar";

const Container = styled.div`
  position: absolute;
  left: 32px;
  top: 32px;
  display: flex;
`;

const SecondaryContainer = styled.div`
  width: 110px;
`;

const Name = styled.div`
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: center;
`;

@inject("playerStore")
@observer
export default class PlayerStatus extends Component {
  render() {
    const { playerStore } = this.props;

    return (
      <Container>
        <Avatar
          level={playerStore.level}
          avatar={playerStore.avatar}
          messages={playerStore.messages}
          inFight={playerStore.inFight}
        />
        <SecondaryContainer>
          <Name>{playerStore.name}</Name>
          <HpBar ratio={playerStore.hpRatio} />
        </SecondaryContainer>
      </Container>
    );
  }
}
