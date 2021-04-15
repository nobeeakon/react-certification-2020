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

export const NoVideoFound = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
