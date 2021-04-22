import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';

import he from 'he';

import { queryWatchUrl, queryPrivateWatchUrl } from '../../../utils/functions/routes';
import WatchLaterButton from '../../WatchLater/WatchLaterIconButton';

import * as Styled from './VideoListCard.styled';

const VideoListCard = ({
  title,
  author,
  description,
  videoId,
  thumbUrl,
  isPrivate,
  videoInfo,
}) => {
  const history = useHistory();
  const [isWatchLaterSelected, setIsWatchLaterSelected] = useState(false);

  const goToVideo = (e) => {
    e.preventDefault();
    if (isPrivate) {
      if (isWatchLaterSelected) {
        history.push(queryPrivateWatchUrl(videoId));
      } else {
        history.push(queryWatchUrl(videoId));
      }
    } else {
      const watchURL = queryWatchUrl(videoId);
      history.push(watchURL);
    }
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
    <Styled.VideoCardContainer onClick={goToVideo}>
      <Styled.ThumbnailContainer>
        <Styled.Overlay>
          {shortDescription}

          <Styled.OverLayButtonContainer>
            {/* { videoInfo, videoId, setIsWatchLaterSelected } */}
            <WatchLaterButton
              videoId={videoId}
              videoInfo={videoInfo}
              setIsWatchLaterSelected={setIsWatchLaterSelected}
            />
          </Styled.OverLayButtonContainer>
        </Styled.Overlay>
        <Styled.VideoThumbnails src={thumbUrl} />
      </Styled.ThumbnailContainer>
      <Styled.InfoContainer>
        <Styled.Title title={titleFull}>{shortTitle}</Styled.Title>
        <Styled.ExtraInfoDiv>
          <Styled.Author to="/" title={authorFull}>
            {shortAuthor}
          </Styled.Author>
        </Styled.ExtraInfoDiv>
      </Styled.InfoContainer>
    </Styled.VideoCardContainer>
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
