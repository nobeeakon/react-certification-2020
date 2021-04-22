import React from 'react';

import { withRouter } from 'react-router';
import queryString from 'query-string';

import VideoDetailView from '../../components/VideoDetail/VideoDetailView';
import RelatedPrivateVideos from '../../components/RelatedVideoList/RelatedVideos/RelatedVideosPrivate.component';

import {
  SAVED_WATCH_LATER_VIDEOS_STORAGE_KEY,
  REQUEST_API_TYPES,
} from '../../utils/constants';

import { storage } from '../../utils/storage';

import useVideo from '../../utils/hooks/useVideos';
import * as Styled from './WatchPrivate.page.styled';

const WatchPrivate = ({ location }) => {
  const REQ_TYPE = REQUEST_API_TYPES.VIDEO_INFO;
  const parsedQuery = queryString.parse(location.search);
  const videoId = parsedQuery.v;
  const { videoList, isLoading } = useVideo(videoId, REQ_TYPE);

  // check if videoId is in stored Videos
  const tmpVideosStored = storage.get(SAVED_WATCH_LATER_VIDEOS_STORAGE_KEY) || {};
  if (!tmpVideosStored[videoId]) return <div>video not in stored videos</div>;

  // no search query provided
  if (!videoId) {
    // return <Redirect to="/" />;
  }

  // no video found...
  if ((!videoList && !isLoading) || (videoList && videoList.length === 0)) {
    // return <Redirect to="/notFound" />;
  }

  if (!videoList) {
    return <div>Loading...</div>;
  }

  const videoItem = videoList[0];
  const videoInfoProps = {
    videoId: videoItem.id,
    channelTitle: videoItem.snippet.channelTitle,
    title: videoItem.snippet.title,
    description: videoItem.snippet.description,
    views: videoItem.statistics.viewCount,
    likes: videoItem.statistics.likeCount,
    dislikes: videoItem.statistics.dislikeCount,
  };

  return (
    <Styled.WatchPage>
      <Styled.VideoContainer>
        <VideoDetailView
          videoId={videoInfoProps.videoId}
          channelTitle={videoInfoProps.channelTitle}
          title={videoInfoProps.title}
          description={videoInfoProps.description}
          views={videoInfoProps.views}
          likes={videoInfoProps.likes}
          dislikes={videoInfoProps.dislikes}
        />
      </Styled.VideoContainer>
      <Styled.RelatedVideoListContainer>
        <RelatedPrivateVideos relatedToVideoId={videoId} isPrivate />
      </Styled.RelatedVideoListContainer>
    </Styled.WatchPage>
  );
};

export default withRouter(WatchPrivate);
