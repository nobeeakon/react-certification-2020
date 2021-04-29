import styled from 'styled-components';

export const ModalContainer = styled.div`
  z-index: 1000;

  position: absolute;
  right: 0;
  top: 0;

  margin-top: 50px;
  margin-right: 50px;
  background-color: ${(props) => props.theme.secondary};
  padding: 0px;
`;
