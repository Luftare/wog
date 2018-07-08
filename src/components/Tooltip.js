import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  bottom: calc(100% + 8px);
  left: ${props => (props.right ? 0 : "100%")};
  display: flex;
  width: 200px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  transform: translateX(${props => (props.right ? 0 : "-100%")});
  padding: 8px;
  pointer-events: none;

  h3 {
    margin: 0 0 8px;
  }
`;

const Title = styled.div`
  color: ${props => props.color || "white"};
  font-size: 16px;
  font-weight: bold;
`;

export default class Tooltip extends Component {
  render() {
    const { title, details, body, right, titleColor } = this.props;

    return (
      <Container right={right}>
        <Title color={titleColor}>{title}</Title>
        {details.map((detail, i) => <div key={i}>{detail}</div>)}
        <div>{body}</div>
      </Container>
    );
  }
}
