import React from 'react';

import { withRouter } from 'react-router';
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';

import VideoDetailView from '../../components/VideoDetail/VideoDetailView';
import RelatedVideos from '../../components/RelatedVideoList/RelatedVideos';

import useVideo from '../../utils/hooks/useVideos';

import { REQUEST_API_TYPES } from '../../utils/constants';

import {
  WatchPage,
  VideoContainer,
  RelatedVideoListContainer,
} from './Watch.page.styled';

const Results = ({ location }) => {
  const REQ_TYPE = REQUEST_API_TYPES.VIDEO_INFO;
  const parsedQuery = queryString.parse(location.search);
  const videoId = parsedQuery.v;
  const { videoList, isLoading } = useVideo(videoId, REQ_TYPE);

  // no search query provided
  if (!videoId) {
    return <Redirect to="/" />;
  }

  // no video found...
  if ((!videoList && !isLoading) || (videoList && videoList.length === 0)) {
    return <Redirect to="/notFound" />;
  }

  if (!videoList) {
    return <div>Loading...</div>;
  }

  const videoItem = videoList[0];
  const videoInfo = {
    videoId: videoItem.id,
    channelTitle: videoItem.snippet.channelTitle,
    title: videoItem.snippet.title,
    description: videoItem.snippet.description,
    views: videoItem.statistics.viewCount,
    likes: videoItem.statistics.likeCount,
    dislikes: videoItem.statistics.dislikeCount,
    tags: videoItem.snippet.tags,
  };

  return (
    <WatchPage>
      <VideoContainer>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <VideoDetailView
            videoId={videoInfo.videoId}
            channelTitle={videoInfo.channelTitle}
            title={videoInfo.title}
            description={videoInfo.description}
            views={videoInfo.views}
            likes={videoInfo.likes}
            dislikes={videoInfo.dislikes}
            tags={videoInfo.tags}
          />
        )}
      </VideoContainer>
      <RelatedVideoListContainer>
        <RelatedVideos relatedToVideoId={videoId} />
      </RelatedVideoListContainer>
    </WatchPage>
  );
};

export default withRouter(Results);
