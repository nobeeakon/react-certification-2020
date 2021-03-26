import React from 'react';
import PropTypes from 'prop-types';

import he from 'he';

import {
  VideoCardContainer,
  VideoThumbnails,
  InfoContainer,
  ThumbnailContainer,
  Title,
  ExtraInfoDiv,
  Author,
  Overlay,
} from './VideoCard.styled';

const VideoCard = ({ title, author, description, goToVideoHandler, thumbUrl }) => {
  const titleFull = he.decode(title);
  const authorFull = he.decode(author);
  const descriptionFull = he.decode(description);

  const shortTitle = titleFull.length > 55 ? `${titleFull.slice(0, 52)}...` : titleFull;
  const shortAuthor =
    authorFull.length > 55 ? `${authorFull.slice(0, 52)}...` : authorFull;
  const shortDescription =
    descriptionFull.length > 200
      ? `${descriptionFull.slice(0, 100)}...`
      : descriptionFull;

  return (
    <VideoCardContainer onClick={goToVideoHandler}>
      <ThumbnailContainer>
        <Overlay>{shortDescription}</Overlay>
        <VideoThumbnails src={thumbUrl} />
      </ThumbnailContainer>
      <InfoContainer>
        <Title title={titleFull}>{shortTitle}</Title>
        <ExtraInfoDiv>
          <Author to="/" title={authorFull}>
            {shortAuthor}
          </Author>
          <span />
        </ExtraInfoDiv>
      </InfoContainer>
    </VideoCardContainer>
  );
};

VideoCard.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  description: PropTypes.string,
  thumbUrl: PropTypes.string,
  goToVideoHandler: PropTypes.func.isRequired,
};

VideoCard.defaultProps = {
  title: '',
  author: '',
  description: '',
  thumbUrl: '',
};

export default VideoCard;
