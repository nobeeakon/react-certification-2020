import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import he from 'he';

import { FaPlay } from 'react-icons/fa';
import { RiErrorWarningFill } from 'react-icons/ri';

import { queryWatchUrl } from '../../../utils/functions/routes';

import {
  VideoCardContainer,
  VideoThumbnails,
  ThumbnailContainer,
  InfoContainer,
  Title,
  ExtraInfoDiv,
  ChannelTitle,
  Overlay,
} from './RelatedVideoCard.styled';

const RelatedVideoCard = ({ title, channelTitle, thumbUrl, isAvailable, videoId }) => {
  const history = useHistory();

  const titleFull = isAvailable ? he.decode(title) : 'Not available';
  const channelTitleFull = he.decode(channelTitle);

  const PlayIcon = !isAvailable ? <RiErrorWarningFill /> : <FaPlay />;

  const goToVideo = (e) => {
    e.preventDefault();
    if (isAvailable) {
      const watchURL = queryWatchUrl(videoId);
      history.push(watchURL);
    }
  };

  const shortTitle = titleFull.length > 36 ? `${titleFull.slice(0, 33)}...` : titleFull;
  const shortChannelTitle =
    channelTitleFull.length > 36
      ? `${channelTitleFull.slice(0, 33)}...`
      : channelTitleFull;

  return (
    <VideoCardContainer onClick={goToVideo} isNotAvailable={!isAvailable}>
      <ThumbnailContainer>
        <Overlay>{PlayIcon}</Overlay>
        <VideoThumbnails src={thumbUrl} />
      </ThumbnailContainer>
      <InfoContainer>
        <Title title={titleFull}>{shortTitle}</Title>
        <ExtraInfoDiv>
          {shortChannelTitle !== '' && (
            <ChannelTitle to="/" title={channelTitleFull}>
              {shortChannelTitle}
            </ChannelTitle>
          )}
        </ExtraInfoDiv>
      </InfoContainer>
    </VideoCardContainer>
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
