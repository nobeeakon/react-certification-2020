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
  isPrivate,
}) => {
  const history = useHistory();
  const [isWatchLaterSelected, setIsWatchLaterSelected] = useState(false);

  const titleFull = isAvailable ? he.decode(title) : 'Not available';
  const channelTitleFull = he.decode(channelTitle);

  const OverlayContent = !isAvailable ? (
    <RiErrorWarningFill />
  ) : (
    <WatchLaterButton
      videoId={videoId}
      videoInfo={videoInfo}
      setIsWatchLaterSelected={setIsWatchLaterSelected}
    />
  );

  const goToVideo = (e) => {
    e.preventDefault();
    if (isAvailable) {
      if (isPrivate) {
        if (isWatchLaterSelected) {
          history.push(queryPrivateWatchUrl(videoId));
        } else {
          history.push(queryWatchUrl(videoId));
        }
      } else {
        history.push(queryWatchUrl(videoId));
      }
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
