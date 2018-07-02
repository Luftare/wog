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
@observer
class Area extends Component {
  constructor(props) {
    super(props);
    const { areaStore, router } = this.props;
    areaStore.initArea(router.params.id);
  }

  componentWillUpdate() {
    const { areaStore, router } = this.props;
    if(router.params.id !== areaStore.area.id) {
      areaStore.initArea(router.params.id);
    }
  }

  render() {
    const { router, areaStore } = this.props;
    return (
      <Container>
        Area: {router.params.id}, Name: {areaStore.area.name}
        <NpcContainer>
          {areaStore.npcs.map((npc, i) => (
            <Npc key={i} onMouseDown={npc.handleClick}>
              {npc.name}
            </Npc>
          ))}
        </NpcContainer>
      </Container>
    );
  }
}

export default Area;
