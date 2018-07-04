import React, { Component } from "react";
import styled from "styled-components";
import Item from "./Item";
import EmptyInventorySlot from "./EmptyInventorySlot";
import CloseButton from "./CloseButton";
import { inject, observer } from "mobx-react";

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  padding: 8px;
  width: 200px;
  box-sizing: border-box;
  background-color: grey;
  pointer-events: all;
  z-index: 100;
`;

const ItemRow = styled.div`
  width: 100%;
  display: grid;
  margin-top: 8px;
  grid-template-columns: 50px auto;
  grid-template-rows: 50px;
  grid-gap: 8px;
`;

const ItemName = styled.div`
  display: flex;
  align-items: center;
  color: yellow;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
`;

@inject("inventoryStore")
@observer
export default class DroppedItems extends Component {
  render() {
    const { loot, closeLoot } = this.props.inventoryStore;
    return (
      <Container>
        <Header>
          <CloseButton onClick={closeLoot}>x</CloseButton>
        </Header>
        {loot.map((item, i) => (
          <ItemRow>
            <Item key={i} item={item} tooltipRight />
            <ItemName>{item.name}</ItemName>
          </ItemRow>
        ))}
      </Container>
    );
  }
}
