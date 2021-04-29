import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import he from 'he';

import { RiErrorWarningFill } from 'react-icons/ri';

import WatchLaterButton from '../../WatchLater/WatchLaterIconButton';

import { queryWatchUrl, queryPrivateWatchUrl } from '../../../utils/functions/routes';

import * as Styled from './RelatedVideoCard.styled';

const RelatedVideoCard = ({
  title,
  channelTitle,
  thumbUrl,
  isAvailable,
  videoId,
  videoInfo,
  isInPrivateRoute,
  removeThisItem,
}) => {
  const history = useHistory();
  const [isWatchLaterSelected, setIsWatchLaterSelected] = useState(true);

  const titleFull = isAvailable ? he.decode(title) : 'Not available';
  const channelTitleFull = he.decode(channelTitle);

  const OverlayContent = !isAvailable ? (
    <RiErrorWarningFill />
  ) : (
    <WatchLaterButton
      videoId={videoId}
      videoInfo={videoInfo}
      isWatchLaterSelected={isWatchLaterSelected}
      isInPrivateRoute={isInPrivateRoute}
      setIsWatchLaterSelected={setIsWatchLaterSelected}
      removeVideoItem={removeThisItem}
    />
  );

  const goToVideo = (e) => {
    e.preventDefault();
    // do nothing if not available
    if (!isAvailable) return;

    // user not logged in
    if (!isInPrivateRoute) {
      history.push(queryWatchUrl(videoId));
      return;
    }

    // user logged in
    if (isWatchLaterSelected) {
      history.push(queryPrivateWatchUrl(videoId));
    }
  };

  const shortTitle = titleFull.length > 36 ? `${titleFull.slice(0, 33)}...` : titleFull;
  const shortChannelTitle =
    channelTitleFull.length > 36
      ? `${channelTitleFull.slice(0, 33)}...`
      : channelTitleFull;

  return (
    <Styled.VideoCardContainer onClick={goToVideo} isNotAvailable={!isAvailable}>
      <Styled.ThumbnailContainer>
        <Styled.Overlay isNotAvailable={!isAvailable}>{OverlayContent}</Styled.Overlay>
        <Styled.VideoThumbnails src={thumbUrl} />
      </Styled.ThumbnailContainer>
      <Styled.InfoContainer>
        <Styled.Title title={titleFull}>{shortTitle}</Styled.Title>
        <Styled.ExtraInfoDiv>
          {shortChannelTitle !== '' && (
            <Styled.ChannelTitle to="/" title={channelTitleFull}>
              {shortChannelTitle}
            </Styled.ChannelTitle>
          )}
        </Styled.ExtraInfoDiv>
      </Styled.InfoContainer>
    </Styled.VideoCardContainer>
  );
};

RelatedVideoCard.propTypes = {
  title: PropTypes.string,
  channelTitle: PropTypes.string,
  thumbUrl: PropTypes.string,
  isAvailable: PropTypes.bool,
  videoId: PropTypes.string.isRequired,
};

RelatedVideoCard.defaultProps = {
  title: '',
  channelTitle: '',
  thumbUrl: '',
  isAvailable: false,
};

export default RelatedVideoCard;
