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
  componentDidMount(props) {
    const { mapStore } = this.props;
    on.key("m", mapStore.toggleMap);
  }

  componentWillUnmount() {
    const { mapStore } = this.props;
    off.key("m", mapStore.toggleMap);
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
