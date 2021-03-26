import styled from 'styled-components';

export const Main = styled.main(
  ({ theme }) => `
  background-color: ${theme.primary};
  padding-top: 15px;
  height: 110%;
`
);
