import styled from 'styled-components';

const StyledButton = styled.button(
  ({ theme }) => `
  background-color: transparent;
  height: 34px;
  border: none;

  color: ${theme.contrast1};

  &:hover {
    color: ${theme.warning2};
  }
`
);

export default StyledButton;
