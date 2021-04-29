import styled from 'styled-components';

import * as breakpoints from '../../../utils/deviceBreakpoints';

export const VideoContainer = styled.div`
  display: grid;
  grid-template-columns: auto;
  justify-items: center;
  padding: 0 0px;

  justify-content: space-around;

  @media only screen and (${breakpoints.small}) {
    grid-template-columns: auto;
  }

  @media only screen and (${breakpoints.medium}) {
    grid-template-columns: auto;
  }
`;

export const Message = styled.div`
  color: ${(props) => props.theme.contrast2};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;
