import React from 'react';
import PropTypes from 'prop-types';

import he from 'he';

import { FaPlay } from 'react-icons/fa';
import { RiErrorWarningFill } from 'react-icons/ri';

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

const RelatedVideoCard = ({ title, channelTitle, goToVideoHandler, thumbUrl }) => {
  const titleFull = he.decode(title);
  const channelTitleFull = he.decode(channelTitle);

  // "Not available" is the default value, check in RelatedVideoCard.defaultProps
  const isNotAvailable = title === 'Not available';
  const PlayIcon = isNotAvailable ? <RiErrorWarningFill /> : <FaPlay />;

  const shortTitle = titleFull.length > 36 ? `${titleFull.slice(0, 33)}...` : titleFull;
  const shortChannelTitle =
    channelTitleFull.length > 36
      ? `${channelTitleFull.slice(0, 33)}...`
      : channelTitleFull;

  return (
    <VideoCardContainer onClick={goToVideoHandler} isNotAvailable={isNotAvailable}>
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
  channelTitle: PropTypes.string,
  title: PropTypes.string,
  thumbUrl: PropTypes.string,
  goToVideoHandler: PropTypes.func.isRequired,
};

RelatedVideoCard.defaultProps = {
  channelTitle: '',
  title: 'Not available',
  thumbUrl: '',
};

export default RelatedVideoCard;
