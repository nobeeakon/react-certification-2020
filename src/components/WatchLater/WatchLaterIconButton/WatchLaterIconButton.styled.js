import styled from 'styled-components';

import { AiFillClockCircle } from 'react-icons/ai';

import StyledButton from '../../StyledComponents/StyledButton';

export const StyledWatchLaterButton = styled(StyledButton)`
  background-color: ${(props) => props.theme.general.dark};
  color: ${(props) => props.theme.general.light};

  height: 36px;
  width: 36px;
  padding: 0;
  margin: 0;

  &:hover {
    color: ${(props) => props.theme.general.warning1};
  }
`;

export const StyledAiFillClockCircle = styled(AiFillClockCircle)`
  height: 32px;
  width: 32px;
`;
