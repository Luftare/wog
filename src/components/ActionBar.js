import React, { Component } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import { emit } from "../utils/eventBus";
import { EVENT_PLAYER_RESPAWN } from "../constants";
import ExperienceBar from "./ExperienceBar";

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100px;
  background: grey;
  box-sizing: border-box;
`;

@inject("playerStore")
@inject("areaStore")
@inject("router")
@observer
class ActionBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <ExperienceBar />
      </Container>
    );
  }
}

export default ActionBar;
