import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  display: block;
  left: 50%;
  top: 0;
  transform: translate(-50%, -100%);
  width: 100%;
  max-width: 700px;
  height: 10px;
  border: 2px solid ${props => props.theme.smoke};
  box-sizing: border-box;
  border-radius: 8px;
`;

const Bar = styled.div`
  display: block;
  background-color: purple;
  height: 100%;
  transition: all 100ms;
  width: ${props => Math.min(100, Math.max(0, props.ratio * 100))}%;
  border-radius: 8px;
`;

@inject("playerStore")
@observer
export default class ExperienceBar extends Component {
  render() {
    return (
      <Container>
        <Bar ratio={this.props.playerStore.experienceRatio} />
      </Container>
    );
  }
}
