import React, { Component } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import { on, off } from "../utils/eventBus";
import Item from "./Item";
import EmptyInventorySlot from "./EmptyInventorySlot";
import Modal from "../containers/Modal";

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

const Stats = styled.div`
  background-color: #aaa;
`;

const Stat = styled.div`
  color: black;
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
      <Modal
        title={playerStore.name}
        visible={playerStore.profileIsOpen}
        onClose={playerStore.toggleProfile}
        wide
      >
        <div>{`Level ${playerStore.level}`}</div>
        {inventoryStore.equippedItemSlots.map((item, i) => (
          <ItemRow key={i}>
            {item ? <Item item={item} /> : <EmptyInventorySlot />}
            <SlotName>{inventoryStore.itemSlots[i].name}</SlotName>
          </ItemRow>
        ))}
        <Stats>
          <Stat>Damage {playerStore.damage}</Stat>
        </Stats>
      </Modal>
    );
  }
}
