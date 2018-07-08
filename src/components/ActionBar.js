import React, { Component } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import ExperienceBar from "./ExperienceBar";
import ActionBarButton from "./ActionBarButton";

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  background: grey;
  box-sizing: border-box;
  padding: 8px;
  border-radius: 4px;
`;

const SkillsBar = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 8px;
`;

@inject("playerStore")
@inject("areaStore")
@inject("inventoryStore")
@inject("mapStore")
@inject("router")
@observer
class ActionBar extends Component {
  render() {
    const { inventoryStore, mapStore, playerStore } = this.props;
    return (
      <Container>
        <ExperienceBar />
        <SkillsBar />
        <SkillsBar>
          <ActionBarButton
            onClick={playerStore.toggleProfile}
            active={playerStore.profileIsOpen}
            text={"Hero"}
          />
          <ActionBarButton
            onClick={mapStore.toggleMap}
            active={mapStore.isOpen}
            text={"Map"}
          />
          <ActionBarButton
            onClick={inventoryStore.toggleInventory}
            active={inventoryStore.isOpen}
            text={"Bag"}
          />
        </SkillsBar>
      </Container>
    );
  }
}

export default ActionBar;
