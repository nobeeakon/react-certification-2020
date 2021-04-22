import React from 'react';
import PropTypes from 'prop-types';

import { BiDislike, BiLike } from 'react-icons/bi';

import { StatsContainer, StatElement } from './VideoDetailView.styled';

import WatchLaterButton from '../../WatchLater/WatchLaterButton';

const Stats = ({ views, likes, dislikes, videoInfo, videoId }) => {
  return (
    <StatsContainer>
      <StatElement>{views} Views</StatElement>
      <StatElement>
        <BiLike />
        {likes}
      </StatElement>
      <StatElement>
        <BiDislike />
        {dislikes}
      </StatElement>
      <StatElement>
        <WatchLaterButton videoId={videoId} videoInfo={videoInfo} />
      </StatElement>
    </StatsContainer>
  );
};

Stats.propTypes = {
  views: PropTypes.string,
  likes: PropTypes.string,
  dislikes: PropTypes.string,
};

Stats.defaultProps = {
  views: '0',
  likes: '0',
  dislikes: '0',
};

export default Stats;
