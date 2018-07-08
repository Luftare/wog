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

@inject("townStore")
@observer
export default class Market extends Component {
  handleMarketClick = e => {
    const { toggleMarket } = this.props.townStore;
    e.stopPropagation();
    toggleMarket();
  };

  render() {
    const { toggleMarket, marketOpen } = this.props.townStore;

    return (
      <Container>
        <Image onClick={this.handleMarketClick}>Market</Image>
        <Modal
          onClose={toggleMarket}
          visible={marketOpen}
          title={"Market"}
          left
        >
          <div>Hi!</div>
        </Modal>
      </Container>
    );
  }
}
