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

const Description = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
`;

const StatsContainer = styled.div`
  width: 350px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 8px;
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(4, 20px)
  grid-gap: 8px;
  width: 100%;
  background: grey;
`;

const Stat = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  padding: 4px;
  box-sizing: border-box;
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
        <Description>{`Level ${playerStore.level}`}</Description>
        {inventoryStore.equippedItemSlots.map((item, i) => (
          <ItemRow key={i}>
            {item ? <Item item={item} /> : <EmptyInventorySlot />}
            <SlotName>{inventoryStore.itemSlots[i].name}</SlotName>
          </ItemRow>
        ))}
        <StatsContainer>
          <Stats>
            <Stat>
              <span>Damage:</span>
              <span>{playerStore.damage}</span>
            </Stat>
            <Stat>
              <span>Crit Rate:</span>
              <span>{`${100 * playerStore.critRate}%`}</span>
            </Stat>
          </Stats>
          <Stats>
            <Stat>
              <span>Hp:</span>
              <span>{playerStore.maxHp}</span>
            </Stat>
            <Stat>
              <span>Hp Reg:</span>
              <span>{`${playerStore.hpRegeneration}Hp/s`}</span>
            </Stat>
          </Stats>
        </StatsContainer>
      </Modal>
    );
  }
}
