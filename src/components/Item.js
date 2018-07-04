import React, { Component } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import HpBar from "./HpBar";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: orange;
  color: black;
`;

@inject("playerStore")
@observer
export default class Item extends Component {
  render() {
    const { item } = this.props;

    return <Container>{item.name}</Container>;
  }
}
