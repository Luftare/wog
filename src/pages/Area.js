import React, { Component } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

import Npc from "../components/Npc";
import NpcContainer from "../containers/NpcContainer";

const Container = styled.div`
  color: blue;
`;

@inject("router")
@inject("areaStore")
@inject("playerStore")
@observer
class Area extends Component {
  constructor(props) {
    super(props);
    const { areaStore, router } = this.props;
    areaStore.setArea(router.params.id);
    areaStore.createNPCs();
  }

  componentWillUpdate() {
    const { areaStore, router } = this.props;
    if (router.params.id !== areaStore.areaIndex) {
      areaStore.setArea(router.params.id);
      areaStore.createNPCs();
    }
  }

  render() {
    const { router, areaStore, playerStore } = this.props;
    return (
      <Container>
        Area: {router.params.id}, Name: {areaStore.area.name}
        <NpcContainer>
          {areaStore.npcs.map((npc, i) => (
            <Npc
              key={i}
              npc={npc}
              onMouseDown={() => areaStore.handleNpcClick(npc, playerStore)}
            />
          ))}
        </NpcContainer>
      </Container>
    );
  }
}

export default Area;
