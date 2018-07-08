import React, { Component } from "react";
import styled from "styled-components";
import { theme } from "../style";
import Item from "./Item";
import EmptyInventorySlot from "./EmptyInventorySlot";
import Modal from "../containers/Modal";
import { inject, observer } from "mobx-react";

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
  color: ${props => props.color || "whtie"};
  font-weight: bold;
`;

@inject("inventoryStore")
@observer
export default class DroppedItems extends Component {
  render() {
    const { loot, closeLoot } = this.props.inventoryStore;
    return (
      <Modal title={"Loot"} visible left onClose={closeLoot}>
        {loot.map((item, i) => (
          <ItemRow>
            {item ? (
              <Item key={i} item={item} tooltipRight />
            ) : (
              <EmptyInventorySlot key={i} />
            )}
            <ItemName color={theme.rarityColor(item && item.rarity)}>
              {item && item.name}
            </ItemName>
          </ItemRow>
        ))}
      </Modal>
    );
  }
}
