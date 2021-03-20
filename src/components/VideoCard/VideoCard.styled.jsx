import styled from 'styled-components';

import StyledLink from '../StyledComponents/StyledLinks';

const transition = '0.06s ease';

const Overlay = styled.div`
  position: absolute;
  text-align: left;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  opacity: 0;
  transition: ${transition};
  background-color: #222729;
  padding: 10px;
  color: ${(props) => props.theme.general.light};

  font-size: 0.6rem;
`;

// Video Card container
const VideoCardContainer = styled.div`
  width: 254px;
  border: none;
  margin: 10px;
  border-radius: 5px;

  overflow: hidden;
  cursor: pointer;

  &:hover {
    transition: ${transition};
    transform: scale(1.06);
  }

  &:hover ${Overlay} {
    opacity: 0.8;
  }
`;

// Image thumbnail
const VideoThumbnails = styled.img`
  object-fit: cover;
`;

// thumbnail container
const ThumbnailContainer = styled.div`
  background-color: ${(props) => props.theme.general.dark};
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  height: 143px;
  overflow: hidden;
`;

// Video info, contain
const InfoContainer = styled.div`
  width: 100%;
  height: 112px;
  padding: 5px;
`;

// Title, should be placed within InfoDiv
const Title = styled.p`
  height: auto;
  font-size: 0.8rem;
  color: ${(props) => props.theme.contrast1};
  border: none;
`;

// Extra information, should be placed within InfoDiv
const ExtraInfoDiv = styled.div`
  font-size: 0.6rem;
`;

// Author, should be placed within ExtraInfoDiv
const Author = styled(StyledLink)`
  font-style: italic;
`;

export {
  VideoCardContainer,
  VideoThumbnails,
  ThumbnailContainer,
  InfoContainer,
  Title,
  ExtraInfoDiv,
  Author,
  Overlay,
};
