import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import styled from "styled-components";
import Item from "./Item";
import EmptyInventorySlot from "./EmptyInventorySlot";

const Container = styled.div`
  position: absolute;
  display: ${props => (props.visible ? "grid" : "none")};
  grid-template-columns: repeat(4, 50px);
  grid-template-rows: repeat(3, 50px);
  grid-gap: 8px;
  right: 0px;
  top: 0px;
  transform: translateY(-100%);
  padding: 8px;
  box-sizing: border-box;
  background-color: grey;
`;

@inject("playerStore")
@inject("inventoryStore")
@observer
export default class Inventory extends Component {
  render() {
    const { inventoryStore } = this.props;
    return (
      <Container visible={inventoryStore.isOpen}>
        {inventoryStore.slots.map(
          (slot, i) =>
            slot ? <Item key={i} item={slot} /> : <EmptyInventorySlot key={i} />
        )}
      </Container>
    );
  }
}
