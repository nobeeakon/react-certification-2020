import styled from 'styled-components';

import StyledLink from '../../StyledComponents/StyledLink';

const transition = '0.06s ease';

export const Overlay = styled.div(
  ({ theme }) => `
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
  color: ${theme.general.light};

  font-size: 0.6rem;
`
);

// Video Card container
export const VideoCardContainer = styled.div`
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
export const VideoThumbnails = styled.img`
  object-fit: cover;
`;

// thumbnail container
export const ThumbnailContainer = styled.div(
  ({ theme }) => `
  background-color: ${theme.general.dark};
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  height: 143px;
  overflow: hidden;
`
);

// Video info, contain
export const InfoContainer = styled.div`
  width: 100%;
  height: 112px;
  padding: 5px;
`;

// Title, should be placed within InfoDiv
export const Title = styled.p(
  ({ theme }) => `
  height: auto;
  font-size: 0.8rem;
  color: ${theme.contrast1};
  border: none;
`
);

// Extra information, should be placed within InfoDiv
export const ExtraInfoDiv = styled.div`
  font-size: 0.6rem;
`;

// Author, should be placed within ExtraInfoDiv
export const Author = styled(StyledLink)`
  font-style: italic;
`;
