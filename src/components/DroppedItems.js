import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import styled from "styled-components";
import Item from "./Item";
import EmptyInventorySlot from "./EmptyInventorySlot";

const Container = styled.div`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(4, 50px);
  grid-template-rows: repeat(${props => props.rows}, 50px);
  grid-gap: 8px;
  right: 0px;
  top: 0px;
  transform: translateY(-100%);
  padding: 8px;
  box-sizing: border-box;
  background-color: grey;
`;

export default class DroppedItems extends Component {
  render() {
    const { items, slots } = this.props;
    const rows = Math.ceil(Math.slots / 4);
    return (
      <Container rows={rows}>
        {[...Array(slots || 8)].map(
          (_, i) =>
            items[i] ? (
              <Item key={i} item={items[i]} />
            ) : (
              <EmptyInventorySlot key={i} />
            )
        )}
      </Container>
    );
  }
}
