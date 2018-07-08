import React, { Component } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import { emit } from "../utils/eventBus";
import { EVENT_ITEM_CLICK } from "../constants";
import { theme } from "../style";
import Tooltip from "./Tooltip";

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: orange;
  background-image: url('${props => props.icon || ""}');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  color: black;
  cursor: pointer;
  box-shadow: ${props => props.theme.shadow};
  border-radius: 4px;
  [class^="Tooltip"] {
    display: none;
  }
  :hover {
    [class^="Tooltip"] {
      display: unset;
    }
  }
  :active {
    box-shadow: none;
    transform: translateY(1px);
  }
`;

@inject("playerStore")
@observer
export default class Item extends Component {
  render() {
    const { item, tooltipRight } = this.props;

    return (
      <Container onClick={() => emit(EVENT_ITEM_CLICK, item)} icon={item.icon}>
        <Tooltip
          title={item.name}
          titleColor={theme.rarityColor(item.rarity)}
          body={item.description}
          details={item.details}
          right={tooltipRight}
        />
      </Container>
    );
  }
}
