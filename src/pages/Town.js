import React, { Component } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

const Container = styled.div`
  color: orange;
`;

@inject("playerStore")
@observer
class Town extends Component {
  render() {
    return <Container>Level: {this.props.playerStore.level}</Container>;
  }
}

export default Town;
