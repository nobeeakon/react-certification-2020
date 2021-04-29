import React from 'react';

import { withRouter } from 'react-router';

import queryString from 'query-string';

import {
  SAVED_WATCH_LATER_VIDEOS_STORAGE_KEY,
  REQUEST_API_TYPES,
} from '../../utils/constants';

import { storage } from '../../utils/storage';

import useVideo from '../../utils/hooks/useVideos';

import WatchPagePresenter from '../Watch/Watch.page.presenter';
import RelatedVideosPrivate from '../../components/RelatedVideoList/RelatedVideos/RelatedVideosPrivate.component';

import * as Styled from './WatchPrivate.page.styled';

import useIsMountedRef from '../../utils/hooks/useIsMountedRef';

const REQ_TYPE = REQUEST_API_TYPES.VIDEO_INFO;

const WatchPrivate = ({ location }) => {
  const isMountedRef = useIsMountedRef();
  const parsedQuery = queryString.parse(location.search);
  const videoId = parsedQuery.v;
  const { videoList, isLoading, error } = useVideo(videoId, REQ_TYPE, isMountedRef);

  // check if videoId is in stored Videos
  const tmpVideosStored = storage.get(SAVED_WATCH_LATER_VIDEOS_STORAGE_KEY) || {};
  if (!tmpVideosStored[videoId])
    return <Styled.VideoNotStored>video not in stored videos</Styled.VideoNotStored>;

  return (
    <WatchPagePresenter
      videoId={videoId}
      videoList={videoList}
      isLoading={isLoading}
      error={error}
      RelatedVideos={<RelatedVideosPrivate relatedToVideoId={videoId} />}
      isInPrivateRoute
    />
  );
};

export default withRouter(WatchPrivate);
