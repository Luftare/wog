import React, { Component } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import { emit } from "../utils/eventBus";
import { EVENT_ITEM_CLICK } from "../constants";
import Tooltip from "./Tooltip";

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: orange;
  color: black;
  cursor: pointer;
  [class^="Tooltip"] {
    display: none;
  }
  :hover {
    [class^="Tooltip"] {
      display: unset;
    }
  }
`;

@inject("playerStore")
@observer
export default class Item extends Component {
  render() {
    const { item, tooltipRight } = this.props;

    return (
      <Container onClick={() => emit(EVENT_ITEM_CLICK, item)}>
        <Tooltip title={item.name} body={item.description} right={tooltipRight} />
        {item.name}
      </Container>
    );
  }
}
