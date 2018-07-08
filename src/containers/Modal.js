import React, { Component } from "react";
import styled from "styled-components";
import CloseButton from "../components/CloseButton";

const Container = styled.div`
  position: absolute;
  top: 50vh;
  left: ${props => (props.left ? "8px" : "50vw")};
  transform: translate(${props => (props.left ? 0 : "-50%")}, -50%);
  z-index: 150;
  width: 300px;
  display: ${props => (props.visible ? "block" : "none")};
  padding: 8px;
  background-color: grey;
  cursor: default;
`;

const TopNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header = styled.div`
  font-size: 20px;
`;

export default class Modal extends Component {
  componentDidMount() {
    //TODO: Add hotkey to close
  }

  render() {
    const { visible, title, onClose, children, left } = this.props;
    return (
      <Container visible={visible} left={left}>
        <TopNav>
          <Header>{title}</Header>
          <CloseButton onClick={onClose}>x</CloseButton>
        </TopNav>
        {children}
      </Container>
    );
  }
}
