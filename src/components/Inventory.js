import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { on, off } from "../utils/eventBus";
import styled from "styled-components";
import Item from "./Item";
import EmptyInventorySlot from "./EmptyInventorySlot";
import Modal from "../containers/Modal";

const Grid = styled.div`
  margin-top: 8px;
  display: grid;
  grid-template-columns: repeat(4, 50px);
  grid-template-rows: repeat(3, 50px);
  grid-gap: 8px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
`;

const Gold = styled.div`
  color: orange;
  font-weight: bold;
`;

@inject("playerStore")
@inject("inventoryStore")
@observer
export default class Inventory extends Component {
  componentDidMount() {
    const { inventoryStore } = this.props;
    on.key("b", inventoryStore.toggleInventory);
  }

  componentWillUnmount() {
    const { inventoryStore } = this.props;
    off.key("b", inventoryStore.toggleInventory);
  }

  render() {
    const { inventoryStore } = this.props;
    return (
      <Modal
        title={"Inventory"}
        visible={inventoryStore.isOpen}
        onClose={inventoryStore.toggleInventory}
        right
        widthFromContent
      >
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
        <Footer>
          <Gold>{inventoryStore.gold}g</Gold>
        </Footer>
      </Modal>
    );
  }
}
