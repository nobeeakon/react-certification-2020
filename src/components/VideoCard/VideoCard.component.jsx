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

const VideoCard = (props) => {
  const titleFull = he.decode(props.title);
  const authorFull = he.decode(props.author);
  const descriptionFull = he.decode(props.description);

  const title = titleFull.length > 55 ? `${titleFull.slice(0, 52)}...` : titleFull;
  const author = authorFull.length > 55 ? `${authorFull.slice(0, 52)}...` : authorFull;
  const description =
    descriptionFull.length > 200
      ? `${descriptionFull.slice(0, 100)}...`
      : descriptionFull;

  return (
    <VideoCardContainer onClick={props.goToVideoHandler}>
      <ThumbnailContainer>
        <Overlay>{description}</Overlay>
        <VideoThumbnails src={props.thumbUrl} />
      </ThumbnailContainer>
      <InfoContainer>
        <Title title={titleFull}>{title}</Title>
        <ExtraInfoDiv>
          <Author to="/" title={authorFull}>
            {author}
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
