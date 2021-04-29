import styled from 'styled-components';

import StyledButton from '../../../StyledComponents/StyledButton';

export const Background = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  background-color: rgba(0, 0, 0, 0.3);
`;

export const ModalContainer = styled.div`
  z-index: 1000;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;

  border-radius: 5px;
`;

export const CloseModal = styled(StyledButton)``;

export const CloseModalContainer = styled.div`
  width: 100%;

  display: flex;
  justify-content: flex-end;
`;

export const ChangeContentTypeButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
`;

export const ChangeContentTypeButton = styled(StyledButton)`
  text-decoration: underline;
`;
