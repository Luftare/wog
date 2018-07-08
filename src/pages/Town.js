import React, { Component } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import { emit, on, off } from "../utils/eventBus";
import { EVENT_TOGGLE_MAP } from "../constants";
import AreasMap from "../components/AreasMap";

const Container = styled.div`
  color: orange;
`;

@inject("playerStore")
@inject("mapStore")
@inject("router")
@observer
class Town extends Component {
  closeModals = () => {
    const { mapStore } = this.props;
    if (mapStore.isOpen) mapStore.toggleMap();
  };

  componentDidMount(props) {
    const { mapStore } = this.props;
    on.key("m", mapStore.toggleMap);
    on.key("Escape", this.closeModals);
  }

  componentWillUnmount() {
    const { mapStore } = this.props;
    off.key("m", mapStore.toggleMap);
    off.key("Escape", this.closeModals);
  }

  render() {
    const { mapStore } = this.props;
    return (
      <Container>
        <h1>Town</h1>
        <AreasMap />
      </Container>
    );
  }
}

export default Town;
