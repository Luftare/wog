import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import styled from "styled-components";
import Item from "./Item";
import EmptyInventorySlot from "./EmptyInventorySlot";
import CloseButton from "./CloseButton";

const Container = styled.div`
  position: absolute;
  display: ${props => (props.visible ? "block" : "none")};
  right: 0px;
  top: -32px;
  padding: 8px;
  transform: translateY(-100%);
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 50px);
  grid-template-rows: repeat(3, 50px);
  grid-gap: 8px;
`;

@inject("playerStore")
@inject("inventoryStore")
@observer
export default class Inventory extends Component {
  render() {
    const { inventoryStore } = this.props;
    return (
      <Container visible={inventoryStore.isOpen}>
        <Header>
          <CloseButton onClick={inventoryStore.toggleInventory}>x</CloseButton>
        </Header>
        <Grid>
          {inventoryStore.slots.map(
            (slot, i) =>
              slot ? (
                <Item key={i} item={slot} />
              ) : (
                <EmptyInventorySlot key={i} />
              )
          )}
        </Grid>
      </Container>
    );
  }
}
