import React, { Component } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import { emit, on, off } from "../utils/eventBus";
import { EVENT_PLAYER_HIT_NPC, EVENT_PLAYER_DIED } from "../constants";

import PlayerStatus from "../components/PlayerStatus";
import AreasMap from "../components/AreasMap";
import ActionBar from "../components/ActionBar";
import DroppedItems from "../components/DroppedItems";
import Npc from "../components/Npc";
import NpcContainer from "../containers/NpcContainer";

const Container = styled.div`
  position: relative;
  height: 100vh;
  display: grid;
  grid-template-rows: 1fr auto;
`;

@inject("router")
@inject("areaStore")
@inject("playerStore")
@inject("mapStore")
@inject("inventoryStore")
@observer
class Area extends Component {
  handlePlayerDeath = () => {
    this.props.router.goTo("/graveyard");
  };

  closeModals = () => {
    const { inventoryStore } = this.props;
    inventoryStore.closeLoot();
    inventoryStore.closeInventory();
  };

  componentDidMount() {
    const { areaStore, inventoryStore, router, mapStore } = this.props;
    areaStore.setArea(router.params.id);
    areaStore.createNpcs();
    on(EVENT_PLAYER_DIED, this.handlePlayerDeath);
    on.key("Escape", this.closeModals);
    on.key("b", inventoryStore.toggleInventory);
    on.key("m", mapStore.toggleMap);
  }

  componentWillUnmount() {
    const { inventoryStore, mapStore, areaStore } = this.props;
    off(EVENT_PLAYER_DIED, this.handlePlayerDeath);
    off.key("Escape", this.closeModals);
    off.key("b", inventoryStore.toggleInventory);
    off.key("m", mapStore.toggleMap);
  }

  componentWillUpdate() {
    const { areaStore, router } = this.props;
    if (router.params.id !== areaStore.areaIndex) {
      areaStore.setArea(router.params.id);
      areaStore.createNpcs();
    }
  }

  render() {
    const { areaStore, inventoryStore } = this.props;
    const showLoot = inventoryStore.loot.length > 0;
    return (
      <Container>
        <AreasMap />
        <PlayerStatus />
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
