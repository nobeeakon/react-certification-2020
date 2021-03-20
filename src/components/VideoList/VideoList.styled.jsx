import styled from 'styled-components';

import * as s from '../../utils/deviceBreaks';

const VideoContainer = styled.div`
  display: grid;
  grid-template-columns: auto;

  justify-items: center;

  margin-left: 10px;
  margin-right: 10px;

  @media only screen and (${s.small}) {
    grid-template-columns: auto auto;
  }

  @media only screen and (${s.large}) {
    grid-template-columns: auto auto auto;
  }

  @media only screen and (${s.extra}) {
    grid-template-columns: auto auto auto auto;
  }
`;

const NoVideoFound = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export { VideoContainer, NoVideoFound };
