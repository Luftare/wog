import styled from "styled-components";

export default styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  width: 20px;
  color: black;
  background-color: ${props => props.theme.red};
  cursor: pointer;
  pointer-events: all;
  box-shadow: ${props => props.theme.shadow};
  border-radius: 4px;
`;
