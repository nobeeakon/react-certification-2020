import styled from 'styled-components';

import * as breakpoints from '../../../utils/deviceBreakpoints';

export const VideoContainer = styled.div`
  display: grid;
  grid-template-columns: auto;

  justify-items: center;

  margin-left: 10px;
  margin-right: 10px;

  @media only screen and (${breakpoints.small}) {
    grid-template-columns: auto auto;
  }

  @media only screen and (${breakpoints.large}) {
    grid-template-columns: auto auto auto;
  }

  @media only screen and (${breakpoints.extra}) {
    grid-template-columns: auto auto auto auto;
  }
`;

export const NoVideoFound = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
