import React, { Component } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import ExperienceBar from "./ExperienceBar";
import Inventory from "./Inventory";
import ActionBarButton from "./ActionBarButton";

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  background: grey;
  box-sizing: border-box;
  padding: 8px;
`;

@inject("playerStore")
@inject("areaStore")
@inject("inventoryStore")
@inject("router")
@observer
class ActionBar extends Component {
  render() {
    const { inventoryStore } = this.props;
    return (
      <Container>
        <ExperienceBar />
        <Inventory />
        <ActionBarButton
          onClick={inventoryStore.toggleInventory}
          active={inventoryStore.isOpen}
          text={"Bag"}
        />
      </Container>
    );
  }
}

export default ActionBar;
