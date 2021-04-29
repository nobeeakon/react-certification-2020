import PropTypes from 'prop-types';
import React from 'react';

import { OuterWrapper, InnerWrapper, ResponsiveIframe } from './YoutubeIframe.styled';

const YoutubeIframe = ({ videoId, title }) => {
  // width / height
  const RATIO = 3 / 2;

  return (
    <OuterWrapper ratio={RATIO}>
      <InnerWrapper>
        <ResponsiveIframe
          src={`https://www.youtube.com/embed/${videoId}`}
          allowFullScreen
          frameBorder="0"
          title={title}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        />
      </InnerWrapper>
    </OuterWrapper>
  );
};

YoutubeIframe.propTypes = {
  videoId: PropTypes.string.isRequired,
  title: PropTypes.string,
};

YoutubeIframe.defaultProps = {
  title: '',
};

export default YoutubeIframe;
