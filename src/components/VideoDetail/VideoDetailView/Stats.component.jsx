import React from 'react';
import PropTypes from 'prop-types';

import { BiDislike, BiLike } from 'react-icons/bi';

import { StatsContainer, StatElement } from './VideoDetailView.styled';

const Stats = ({ views, likes, dislikes }) => {
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
