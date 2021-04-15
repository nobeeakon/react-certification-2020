import PropTypes from 'prop-types';
import React from 'react';

import { OuterWrapper, InnerWrapper, ResponsiveIframe } from './YoutubeIframe.styled';

const YoutubeIframe = ({ videoId }) => {
  // width / height
  const RATIO = 3 / 2;

  return (
    <OuterWrapper ratio={RATIO}>
      <InnerWrapper>
        <ResponsiveIframe src={`https://www.youtube.com/embed/${videoId}`} />
      </InnerWrapper>
    </OuterWrapper>
  );
};

YoutubeIframe.propTypes = {
  videoId: PropTypes.string.isRequired,
};

export default YoutubeIframe;
