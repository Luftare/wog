import React, { Component } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import { emit } from "../utils/eventBus";
import { EVENT_PLAYER_RESPAWN } from "../constants";

const Container = styled.div`
  background: lightgrey;
  padding: 32px;
`;

@inject("playerStore")
@inject("areaStore")
@inject("router")
@observer
class Graveyard extends Component {
  constructor(props) {
    super(props);
    setTimeout(() => {
      emit(EVENT_PLAYER_RESPAWN);
      props.router.goTo(`/area/${props.areaStore.areaIndex}`);
    }, 2000);
  }

  render() {
    return <Container>Graveyard.</Container>;
  }
}

export default Graveyard;
