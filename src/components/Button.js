import styled from "styled-components";

export default styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  color: ${props => props.color || props.theme.white};
  background-color: ${props => props.background || props.theme.red};
  cursor: pointer;
  pointer-events: all;
  box-shadow: ${props => props.theme.shadow};
  border-radius: 4px;

  :active {
    box-shadow: none;
    transform: translateY(1px);
  }
`;
