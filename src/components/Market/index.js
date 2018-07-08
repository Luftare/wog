import React, { Component } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import Modal from "../../containers/Modal";

const Container = styled.div`
  position: static;
  width: 100px;
  height: 100px;
`;

const Image = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: pink;
  cursor: pointer;
`;

const Split = styled.div`
  display: grid;
  grid-template-columns: 300px 400px;
  grid-template-rows: 200px;
  grid-gap: 8px;
`;

const FeatureImage = styled.div`
  background-color: pink;
  height: 100%;
  width: 100%;
  display: block;
`;

const TextBox = styled.div`
  font-size: 24px;
  display: flex;
  align-items: center;
`;

@inject("townStore")
@inject("playerStore")
@inject("inventoryStore")
@observer
export default class Market extends Component {
  handleMarketClick = e => {
    const { townStore, inventoryStore } = this.props;
    townStore.toggleMarket();
    if (!inventoryStore.isOpen) inventoryStore.toggleInventory();
  };

  render() {
    const { toggleMarket, marketOpen } = this.props.townStore;
    const { playerStore } = this.props;

    return (
      <Container>
        <Image onClick={this.handleMarketClick}>Market</Image>
        <Modal
          onClose={toggleMarket}
          visible={marketOpen}
          title={"Market"}
          widthFromContent
        >
          <Split>
            <FeatureImage />
            <TextBox>
              {`Welcome, ${
                playerStore.name
              }! I can see you have some exciting items. Maybe you would like to sell me some of them?`}
            </TextBox>
          </Split>
        </Modal>
      </Container>
    );
  }
}
