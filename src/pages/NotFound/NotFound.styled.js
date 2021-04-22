import styled from 'styled-components';
import { RiEmotionSadFill } from 'react-icons/ri';
import { IoIosSad } from 'react-icons/io';

export const IconContainer = styled.div`
  position: fixed;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: transparent;
  padding: 20px;

  width: 300px;
  height: 300px;
`;

export const Icon1 = styled(RiEmotionSadFill)`
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.contrast1};
`;

export const Icon2 = styled(IoIosSad)`
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.contrast1};
`;

export const Legend = styled.div`
  font-size: larger;
  display: flex;
  justify-content: center;
  color: ${(props) => props.theme.contrast2};
`;
