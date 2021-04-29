import React from 'react';
import PropTypes from 'prop-types';

import useVideos from '../../../utils/hooks/useVideos';

import RelatedVideosPresenter from './RelatedVideos.presenter';

import { REQUEST_API_TYPES } from '../../../utils/constants';

import * as Styled from './RelatedVideos.styled';

import useIsMountedRef from '../../../utils/hooks/useIsMountedRef';

const REQ_TYPE = REQUEST_API_TYPES.SEARCH_RELATED_VIDEOS;

const RelatedVideos = ({ relatedToVideoId }) => {
  const isMountedRef = useIsMountedRef();
  const { videoList, isLoading, error } = useVideos(
    relatedToVideoId,
    REQ_TYPE,
    isMountedRef
  );

  if (isLoading) return <Styled.Message>Loading...</Styled.Message>;
  if (error) return <Styled.Message>Something went wrong :( </Styled.Message>;

  return <RelatedVideosPresenter videoList={videoList} />;
};

RelatedVideos.propTypes = {
  relatedToVideoId: PropTypes.string.isRequired,
};

export default RelatedVideos;
