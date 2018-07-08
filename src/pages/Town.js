import React, { Component } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import { emit, on, off } from "../utils/eventBus";
import { EVENT_TOGGLE_MAP } from "../constants";
import AreasMap from "../components/AreasMap";
import PlayerProfile from "../components/PlayerProfile";

const Container = styled.div`
  color: orange;
`;

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
    const { mapStore } = this.props;
    return (
      <Container>
        <PlayerProfile />
        <AreasMap />
        <h1>Town</h1>
      </Container>
    );
  }
}

export default Town;
