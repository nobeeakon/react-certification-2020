import React from 'react';
import PropTypes from 'prop-types';

import useVideos from '../../../utils/hooks/useVideos';

import RelatedVideosPresenter from './RelatedVideos.presenter';

import { REQUEST_API_TYPES } from '../../../utils/constants';

import { NoVideoFound } from './RelatedVideos.styled';

const RelatedVideos = ({ relatedToVideoId, isPrivate }) => {
  const REQ_TYPE = REQUEST_API_TYPES.SEARCH_RELATED_VIDEOS;
  const { videoList, isLoading } = useVideos(relatedToVideoId, REQ_TYPE);

  if (isLoading) return <NoVideoFound>Loading...</NoVideoFound>;
  if (!videoList) return null;

  return <RelatedVideosPresenter videoList={videoList} isPrivate={isPrivate} />;
};

RelatedVideos.propTypes = {
  relatedToVideoId: PropTypes.string.isRequired,
};

export default RelatedVideos;
