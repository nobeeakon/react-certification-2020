import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: transparent;
  height: 34px;
  border: none;

  color: ${(props) => props.theme.contrast1};

  &:hover {
    color: ${(props) => props.theme.warning2};
  }
`;

export default StyledButton;
