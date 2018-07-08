import React, { Component } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import { on, off } from "../utils/eventBus";
import areas from "../config/areas";

const Container = styled.div`
  position: absolute;
  display: ${props => (props.visible ? "flex" : "none")};
  flex-direction: column;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #444;
  box-sizing: border-box;
  padding: 60px;
  z-index: 200;
`;

const Area = styled.a`
  padding: 16px 8px;
  color: white;
  background-color: #aaa;
  text-decoration: none;
  margin-top: 8px;
`;

@inject("mapStore")
@observer
export default class AreasMap extends Component {
  componentDidMount() {
    const { mapStore } = this.props;
    on.key("m", mapStore.toggleMap);
  }

  componentWillUnmount() {
    const { mapStore } = this.props;
    off.key("m", mapStore.toggleMap);
  }

  render() {
    const { isOpen, toggleMap } = this.props.mapStore;

    return (
      <Container visible={isOpen}>
        <Area href={"#/"} onClick={toggleMap}>
          Town
        </Area>
        {areas.map((area, i) => (
          <Area href={`#/area/${i}`} key={i} onClick={toggleMap}>
            {area.name}
          </Area>
        ))}
      </Container>
    );
  }
}
