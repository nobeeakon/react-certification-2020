import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';

import he from 'he';

import { queryWatchUrl, queryPrivateWatchUrl } from '../../../utils/functions/routes';
import WatchLaterButton from '../../WatchLater/WatchLaterIconButton';

import * as Styled from './VideoListCard.styled';

const VideoListCard = ({
  title,
  channelTitle,
  description,
  videoId,
  thumbUrl,
  isInPrivateRoute,
  videoInfo,
  removeThisItem,
}) => {
  const history = useHistory();
  const [isWatchLaterSelected, setIsWatchLaterSelected] = useState(true);

  const goToVideo = (e) => {
    e.preventDefault();
    if (isInPrivateRoute) {
      // can safely do this because only selected are shown
      history.push(queryPrivateWatchUrl(videoId));
    } else {
      history.push(queryWatchUrl(videoId));
    }
  };

  const titleFull = he.decode(title);
  const channelTitleFull = he.decode(channelTitle);
  const descriptionFull = he.decode(description);

  const shortTitle = titleFull.length > 55 ? `${titleFull.slice(0, 52)}...` : titleFull;
  const shortchannelTitle =
    channelTitleFull.length > 55
      ? `${channelTitleFull.slice(0, 52)}...`
      : channelTitleFull;
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
            <WatchLaterButton
              videoId={videoId}
              videoInfo={videoInfo}
              isWatchLaterSelected={isWatchLaterSelected}
              setIsWatchLaterSelected={setIsWatchLaterSelected}
              removeVideoItem={removeThisItem}
              isInPrivateRoute={isInPrivateRoute}
            />
          </Styled.OverLayButtonContainer>
        </Styled.Overlay>
        <Styled.VideoThumbnails src={thumbUrl} />
      </Styled.ThumbnailContainer>
      <Styled.InfoContainer>
        <Styled.Title title={titleFull}>{shortTitle}</Styled.Title>
        <Styled.ExtraInfoDiv>
          <Styled.ChannelTitle title={channelTitleFull}>
            {shortchannelTitle}
          </Styled.ChannelTitle>
        </Styled.ExtraInfoDiv>
      </Styled.InfoContainer>
    </Styled.VideoCardContainer>
  );
};

VideoListCard.propTypes = {
  title: PropTypes.string,
  channelTitle: PropTypes.string,
  description: PropTypes.string,
  thumbUrl: PropTypes.string,
  videoId: PropTypes.string.isRequired,
};

VideoListCard.defaultProps = {
  title: '',
  channelTitle: '',
  description: '',
  thumbUrl: '',
};

export default VideoListCard;
