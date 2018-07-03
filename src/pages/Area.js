import React, { Component } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import emit from "../utils/emitter";
import { EVENT_PLAYER_HIT_NPC } from "../constants";

import PlayerStatus from "../components/PlayerStatus";
import Npc from "../components/Npc";
import NpcContainer from "../containers/NpcContainer";

const Container = styled.div`
  position: relative;
  color: blue;
`;

@inject("router")
@inject("areaStore")
@inject("playerStore")
@observer
class Area extends Component {
  constructor(props) {
    super(props);
    const { areaStore, router } = this.props;
    areaStore.setArea(router.params.id);
    areaStore.createNpcs();
  }

  componentWillUpdate() {
    const { areaStore, router } = this.props;
    if (router.params.id !== areaStore.areaIndex) {
      areaStore.setArea(router.params.id);
      areaStore.createNpcs();
    }
  }

  render() {
    const { router, areaStore } = this.props;
    return (
      <Container>
        <PlayerStatus />
        Area: {router.params.id}, Name: {areaStore.area.name}
        <NpcContainer>
          {areaStore.npcs.map((npc, i) => (
            <Npc
              key={i}
              npc={npc}
              onMouseDown={() => emit(EVENT_PLAYER_HIT_NPC, npc)}
            />
          ))}
        </NpcContainer>
      </Container>
    );
  }
}

export default Area;
