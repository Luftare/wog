import React, { Component } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import { emit, on, off } from "../utils/eventBus";
import { EVENT_PLAYER_HIT_NPC, EVENT_PLAYER_DIED } from "../constants";

import PlayerStatus from "../components/PlayerStatus";
import ActionBar from "../components/ActionBar";
import DroppedItems from "../components/DroppedItems";
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

  constructor(props) {
    super(props);
    const { areaStore, inventoryStore, router } = this.props;
    areaStore.setArea(router.params.id);
    areaStore.createNpcs();
    on(EVENT_PLAYER_DIED, this.handlePlayerDeath);
    on.key("Escape", this.closeModals);
    on.key("b", inventoryStore.toggleInventory);
  }

  componentWillUnmount() {
    const { inventoryStore } = this.props;
    off(EVENT_PLAYER_DIED, this.handlePlayerDeath);
    off.key("Escape", this.closeModals);
    off.key("b", inventoryStore.toggleInventory);
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
