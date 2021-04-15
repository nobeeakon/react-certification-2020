import React from 'react';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';

import he from 'he';

import { queryWatchUrl } from '../../../utils/functions/routes';

import {
  VideoCardContainer,
  VideoThumbnails,
  InfoContainer,
  ThumbnailContainer,
  Title,
  ExtraInfoDiv,
  Author,
  Overlay,
} from './VideoListCard.styled';

const VideoListCard = ({ title, author, description, videoId, thumbUrl }) => {
  const history = useHistory();

  const goToVideo = (e) => {
    e.preventDefault();
    const watchURL = queryWatchUrl(videoId);
    history.push(watchURL);
  };

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
    <VideoCardContainer onClick={goToVideo}>
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

VideoListCard.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  description: PropTypes.string,
  thumbUrl: PropTypes.string,
  videoId: PropTypes.string.isRequired,
};

VideoListCard.defaultProps = {
  title: '',
  author: '',
  description: '',
  thumbUrl: '',
};

export default VideoListCard;
