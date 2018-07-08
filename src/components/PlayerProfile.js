import React, { Component } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import { on, off } from "../utils/eventBus";
import Item from "./Item";
import EmptyInventorySlot from "./EmptyInventorySlot";

const Container = styled.div`
  position: absolute;
  left: 50vw;
  top: 50vh;
  padding: 8px;
  box-sizing: border-box;
  transform: translate(-50%, -50%);
  width: 500px;
  display: ${props => (props.visible ? "block" : "none")};
  background-color: grey;
  z-index: 150;
`;

const ItemRow = styled.div`
  display: grid;
  grid-template-columns: 50px 150px;
  grid-template-rows: repeat(5, 50px);
  grid-gap: 8px;
`;

const SlotName = styled.div`
  display: flex;
  align-items: center;
  color: white;
`;

@inject("playerStore")
@inject("inventoryStore")
@observer
export default class PlayerProfile extends Component {
  componentDidMount() {
    const { playerStore } = this.props;
    on.key("c", playerStore.toggleProfile);
  }

  componentWillUnmount() {
    const { playerStore } = this.props;
    off.key("c", playerStore.toggleProfile);
  }

  render() {
    const { playerStore, inventoryStore } = this.props;

    return (
      <Container visible={playerStore.profileIsOpen}>
        <h3>{playerStore.name}</h3>
        <div>{`Level ${playerStore.level}`}</div>
        {inventoryStore.equippedItemSlots.map((item, i) => (
          <ItemRow key={i}>
            {item ? <Item item={item} /> : <EmptyInventorySlot />}
            <SlotName>{inventoryStore.itemSlots[i].name}</SlotName>
          </ItemRow>
        ))}
      </Container>
    );
  }
}
