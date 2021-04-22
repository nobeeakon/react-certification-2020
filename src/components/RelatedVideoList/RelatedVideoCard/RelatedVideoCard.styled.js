import styled from 'styled-components';

import StyledLink from '../../StyledComponents/StyledLink';
import * as breakpoints from '../../../utils/deviceBreakpoints';

const transition = '0.06s ease';

export const Overlay = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  transition: ${transition};

  padding: 10px;

  color: ${(props) => props.theme.general.light};

  font-size: 0.6rem;

  & * {
    width: 40%;
    height: 50%;
  }

  ${(props) =>
    props.isNotAvailable &&
    `
    & * {
    width: 40%;
    height: 40%;
  }
      justify-content: center;
      align-items: center;
    `}
`;

export const WatchLaterButtonContainer = styled.div`
  color: blue;
`;

// Video Card container
export const VideoCardContainer = styled.div`
  border: none;

  height: 80px;
  width: 100%;

  margin: 5px;
  display: grid;
  grid-template-columns: 120px auto;

  overflow: hidden;
  cursor: ${(props) => (props.isNotAvailable ? 'not-allowed' : 'pointer')};

  &:hover ${Overlay} {
    opacity: 0.9;
  }

  @media only screen and (${breakpoints.small}) {
    width: 270px;
  }

  @media only screen and (${breakpoints.medium}) {
    width: 290px;
    margin: 10px;
  }

  @media only screen and (${breakpoints.large}) {
    width: 340px;
  }
`;

// thumbnail container
export const ThumbnailContainer = styled.div`
  background-color: ${(props) => props.theme.general.dark};

  position: relative;
  display: flex;
  align-items: center;

  width: 100%;
  overflow: hidden;
`;

// Image thumbnail
export const VideoThumbnails = styled.img`
  object-fit: cover;
`;

// Video info, contain
export const InfoContainer = styled.div`
  position: relative;
  padding: 0 5px;
  height: 100%;
`;

// Title, should be placed within InfoDiv
export const Title = styled.span`
  font-size: medium;

  color: ${(props) => props.theme.contrast1};

  @media only screen and (${breakpoints.small}) {
    font-size: small;
  }

  @media only screen and (${breakpoints.large}) {
    font-size: medium;
  }
`;

// Extra information, should be placed within InfoDiv
export const ExtraInfoDiv = styled.div`
  position: absolute;
  bottom: 0;
`;

// Author, should be placed within ExtraInfoDiv
export const ChannelTitle = styled(StyledLink)`
  font-style: italic;
  font-size: x-small;
`;
