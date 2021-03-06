import React, { Component } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import { on, off } from "../utils/eventBus";
import AreasMap from "../components/AreasMap";
import PlayerProfile from "../components/PlayerProfile";
import ActionBar from "../components/ActionBar";
import Inventory from "../components/Inventory";
import Market from "../components/Market";
import background from "../config/areas/town/background.svg";

const Container = styled.div`
  position: relative;
  height: 100vh;
  background-image: url('${background}');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const TownContainer = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-around;
  align-items: center;
`;

@inject("playerStore")
@inject("mapStore")
@inject("router")
@inject("townStore")
@inject("rootStore")
@observer
class Town extends Component {
  componentDidMount(props) {
    const { rootStore } = this.props;
    on.key("Escape", rootStore.closeAllModals);
  }

  componentWillUnmount() {
    const { rootStore } = this.props;
    off.key("Escape", rootStore.closeAllModals);
    rootStore.closeAllModals();
  }

  render() {
    return (
      <Container>
        <PlayerProfile />
        <AreasMap />
        <Inventory />
        <TownContainer>
          <Market />
        </TownContainer>
        <ActionBar />
      </Container>
    );
  }
}

export default Town;
