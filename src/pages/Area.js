import React, { Component } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

const Container = styled.div`
  color: green;
`;

@inject("router")
@inject("areaStore")
@observer
class Area extends Component {
  render() {
    return <Container>Area: {this.props.router.params.name}</Container>;
  }
}

export default Area;
