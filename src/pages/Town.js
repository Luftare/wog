import React, { Component } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import { on, off } from "../utils/eventBus";
import AreasMap from "../components/AreasMap";
import PlayerProfile from "../components/PlayerProfile";
import ActionBar from "../components/ActionBar";
import Market from "../components/Market";

const Container = styled.div`
  position: relative;
  height: 100vh;
  display: grid;
  grid-template-rows: 1fr auto;
  background-color: lightgrey;
`;

const TownContainer = styled.div``;

@inject("playerStore")
@inject("mapStore")
@inject("router")
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
  }

  render() {
    return (
      <Container>
        <PlayerProfile />
        <AreasMap />
        <TownContainer>
          <h1>Town</h1>
          <Market />
        </TownContainer>
        <ActionBar />
      </Container>
    );
  }
}

export default Town;
