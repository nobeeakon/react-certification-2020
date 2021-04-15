import styled from 'styled-components';

import * as breakpoints from '../../utils/deviceBreakpoints';

export const WatchPage = styled.div`
  margin: 0 5px;

  @media only screen and (${breakpoints.small}) {
    display: grid;
    grid-gap: 5px;
    grid-template-columns: 50% auto;
    justify-items: start;
    justify-content: space-around;
  }

  @media only screen and (${breakpoints.medium}) {
    grid-template-columns: 55% auto;
  }
`;

export const VideoContainer = styled.div`
  width: 100%;
`;

export const RelatedVideoListContainer = styled.div``;
