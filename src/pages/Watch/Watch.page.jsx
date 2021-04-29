import React from 'react';

import { withRouter } from 'react-router';
import queryString from 'query-string';

import WatchPagePresenter from './Watch.page.presenter';
import RelatedVideos from '../../components/RelatedVideoList/RelatedVideos';

import useVideo from '../../utils/hooks/useVideos';

import { REQUEST_API_TYPES } from '../../utils/constants';

import useIsMountedRef from '../../utils/hooks/useIsMountedRef';

const REQ_TYPE = REQUEST_API_TYPES.VIDEO_INFO;

const Results = ({ location }) => {
  const parsedQuery = queryString.parse(location.search);
  const videoId = parsedQuery.v;
  const isMountedRef = useIsMountedRef();

  const { videoList, isLoading, error } = useVideo(videoId, REQ_TYPE, isMountedRef);

  return (
    <WatchPagePresenter
      videoId={videoId}
      videoList={videoList}
      isLoading={isLoading}
      error={error}
      RelatedVideos={<RelatedVideos relatedToVideoId={videoId} />}
    />
  );
};

export default withRouter(Results);
