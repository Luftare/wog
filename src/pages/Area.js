import React, { Component } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import { emit, on, off } from "../utils/eventBus";
import { EVENT_PLAYER_HIT_NPC, EVENT_PLAYER_DIED } from "../constants";

import PlayerStatus from "../components/PlayerStatus";
import ActionBar from "../components/ActionBar";
import Npc from "../components/Npc";
import NpcContainer from "../containers/NpcContainer";

const Container = styled.div`
  position: relative;
  height: 100vh;
  display: grid;
  grid-template-rows: 1fr auto;
  color: blue;
`;

@inject("router")
@inject("areaStore")
@inject("playerStore")
@observer
class Area extends Component {
  playerDiedHandler = () => {
    this.props.router.goTo("/graveyard");
  };

  constructor(props) {
    super(props);
    const { areaStore, router } = this.props;
    areaStore.setArea(router.params.id);
    areaStore.createNpcs();
    on(EVENT_PLAYER_DIED, this.playerDiedHandler);
  }

  componentWillUnmount() {
    off(EVENT_PLAYER_DIED, this.playerDiedHandler);
  }

  componentWillUpdate() {
    const { areaStore, router } = this.props;
    if (router.params.id !== areaStore.areaIndex) {
      areaStore.setArea(router.params.id);
      areaStore.createNpcs();
    }
  }

  render() {
    const { areaStore } = this.props;
    return (
      <Container>
        <PlayerStatus />
        <NpcContainer>
          {areaStore.npcs.map((npc, i) => (
            <Npc
              key={i}
              npc={npc}
              onMouseDown={() => emit(EVENT_PLAYER_HIT_NPC, npc)}
            />
          ))}
        </NpcContainer>
        <ActionBar />
      </Container>
    );
  }
}

export default Area;
