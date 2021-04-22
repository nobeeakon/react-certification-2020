import React from 'react';
import PropTypes from 'prop-types';

import he from 'he';

import YouTubeIframe from '../YoutubeIframe/YoutubeIframe.component';
import Stats from './Stats.component';
import Description from './Description.component';

import {
  MainInfoContainer,
  YoutubeIframeContainer,
  Title,
  InfoContainer,
  ChannelTitle,
} from './VideoDetailView.styled';

const VideoDetailView = ({
  videoId,
  channelTitle,
  title,
  description,
  views,
  likes,
  dislikes,
  videoInfo,
}) => {
  const titleFull = he.decode(title);
  const channelTitleFull = he.decode(channelTitle);

  return (
    <div>
      <YoutubeIframeContainer>
        <YouTubeIframe videoId={videoId} title={titleFull} />
      </YoutubeIframeContainer>
      <MainInfoContainer>
        <Title>{titleFull}</Title>
        <Stats
          views={views}
          likes={likes}
          dislikes={dislikes}
          videoId={videoId}
          videoInfo={videoInfo}
        />
      </MainInfoContainer>
      <InfoContainer>
        <ChannelTitle>{channelTitleFull}</ChannelTitle>

        <Description description={description} />
      </InfoContainer>
    </div>
  );
};

VideoDetailView.propTypes = {
  videoId: PropTypes.string.isRequired,
  channelTitle: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  views: PropTypes.string,
  dislikes: PropTypes.string,
  likes: PropTypes.string,
};

VideoDetailView.defaultProps = {
  channelTitle: '',
  title: '',
  description: '',
  views: '0',
  dislikes: '0',
  likes: '0',
};

export default VideoDetailView;
