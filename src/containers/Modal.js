import React, { Component } from "react";
import styled from "styled-components";
import CloseButton from "../components/CloseButton";

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: ${props => {
    if (props.left) return "16px";
    if (props.right) return "calc(100% - 16px)";
    return "50vw";
  }};
  transform: translate(
    ${props => {
      if (props.left) return 0;
      if (props.right) return "-100%";
      return "-50%";
    }},
    -50%
  );
  z-index: 150;
  width: ${props => {
    if (props.wide) return "500px";
    if (props.widthFromContent) return "unset";
    return "250px";
  }};
  display: ${props => (props.visible ? "block" : "none")};
  padding: 8px;
  background-color: ${props => props.theme.smoke};
  cursor: default;
  box-shadow: ${props => props.theme.shadow};
  border-radius: 4px;
`;

const TopNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header = styled.div`
  font-size: 20px;
  color: ${props => props.theme.white};
`;

export default class Modal extends Component {
  render() {
    const {
      visible,
      title,
      onClose,
      children,
      left,
      right,
      wide,
      widthFromContent
    } = this.props;
    return (
      <Container
        visible={visible}
        left={left}
        right={right}
        wide={wide}
        widthFromContent={widthFromContent}
      >
        <TopNav>
          <Header>{title}</Header>
          <CloseButton onClick={onClose}>x</CloseButton>
        </TopNav>
        {children}
      </Container>
    );
  }
}
