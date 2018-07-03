import styled, { keyframes } from "styled-components";

const animation = keyframes`
  0% {
    opacity: 1;
    transform: translate(-50%, 0) scale(0.5, 0.5);
  }
  20% {
    opacity: 1;
    transform: translate(-50%, -20px) scale(1.1, 1.1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -100px) scale(1, 1);
  }
`;

export default styled.span`
  position: absolute;
  opacity: 0;
  top: ${props => props.top || 0};
  left: ${props => props.left || 0};
  font-size: 20px;
  color: white;
  animation: ${animation} 1000ms;
  animation-timing-function: linear;
`;
