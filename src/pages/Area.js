import React, { Component } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import { emit, on, off } from "../utils/eventBus";
import { EVENT_PLAYER_HIT_NPC, EVENT_PLAYER_DIED } from "../constants";

import PlayerStatus from "../components/PlayerStatus";
import PlayerProfile from "../components/PlayerProfile";
import AreasMap from "../components/AreasMap";
import ActionBar from "../components/ActionBar";
import Inventory from "../components/Inventory";
import DroppedItems from "../components/DroppedItems";
import Npc from "../components/Npc";
import NpcContainer from "../containers/NpcContainer";

const Container = styled.div`
  position: relative;
  height: 100vh;
  background-image: url('${props => props.background}');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

@inject("areaStore")
@inject("playerStore")
@inject("mapStore")
@inject("inventoryStore")
@inject("rootStore")
@inject("router")
@observer
class Area extends Component {
  handlePlayerDeath = () => {
    this.props.router.goTo("/graveyard");
  };

  componentDidMount() {
    const { areaStore, router, rootStore } = this.props;
    areaStore.setArea(router.params.id);
    areaStore.createNpcs();
    on(EVENT_PLAYER_DIED, this.handlePlayerDeath);
    on.key("Escape", rootStore.closeAllModals);
  }

  componentWillUnmount() {
    const { rootStore } = this.props;
    off(EVENT_PLAYER_DIED, this.handlePlayerDeath);
    off.key("Escape", rootStore.closeAllModals);
    rootStore.closeAllModals();
  }

  componentWillUpdate() {
    const { areaStore, router } = this.props;
    if (router.params.id !== areaStore.areaIndex) {
      areaStore.setArea(router.params.id);
      areaStore.createNpcs();
    }
  }

  render() {
    const { areaStore, inventoryStore, router } = this.props;
    console.log(areaStore.area);
    const showLoot = inventoryStore.loot.length > 0;
    router.params.id; //force update
    return (
      <Container background={areaStore.area.background}>
        <AreasMap />
        <PlayerProfile />
        <PlayerStatus />
        <Inventory />
        {showLoot && <DroppedItems />}
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
