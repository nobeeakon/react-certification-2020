import React from 'react';

import { Redirect } from 'react-router-dom';

import VideoDetailView from '../../components/VideoDetail/VideoDetailView';

import * as Styled from './Watch.page.styled';

const WatchPagePresenter = ({ videoId, videoList, isLoading, error, RelatedVideos }) => {
  // error while fetching
  if (error) return <Styled.Message>Something went wrong :( </Styled.Message>;

  // no search query provided
  if (!videoId) {
    return <Redirect to="/" />;
  }

  // no video found...
  if (videoList.length === 0 && !isLoading) {
    return <Redirect to="/notFound" />;
  }

  if (isLoading) {
    return <Styled.Message>Loading...</Styled.Message>;
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
  };

  return (
    <Styled.WatchPage>
      <Styled.VideoContainer>
        <VideoDetailView
          videoId={videoInfo.videoId}
          channelTitle={videoInfo.channelTitle}
          title={videoInfo.title}
          description={videoInfo.description}
          views={videoInfo.views}
          likes={videoInfo.likes}
          dislikes={videoInfo.dislikes}
          videoInfo={videoItem}
        />
      </Styled.VideoContainer>
      <Styled.RelatedVideoListContainer>{RelatedVideos}</Styled.RelatedVideoListContainer>
    </Styled.WatchPage>
  );
};

export default WatchPagePresenter;
