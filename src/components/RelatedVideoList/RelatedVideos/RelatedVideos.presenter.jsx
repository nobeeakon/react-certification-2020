import React from 'react';

import RelatedVideoCard from '../RelatedVideoCard';

import * as Styled from './RelatedVideos.styled';

import getVideoKey from '../../../utils/functions/getVideoKey';

const RelatedVideosPresenter = ({ videoList, isInPrivateRoute, removeItem }) => {
  if (videoList.length === 0) return <Styled.Message> No Video Found :( </Styled.Message>;

  return (
    <Styled.VideoContainer>
      {videoList
        .filter((video) => video?.id?.videoId)
        .map((video) => (
          <RelatedVideoCard
            isAvailable={Boolean(video?.snippet)}
            videoId={video.id.videoId}
            key={getVideoKey(video)}
            thumbUrl={video?.snippet?.thumbnails?.default?.url}
            title={video?.snippet?.title}
            channelTitle={video?.snippet?.channelTitle}
            videoInfo={video}
            isInPrivateRoute={isInPrivateRoute}
            removeThisItem={() => removeItem(video.id.videoId)}
          />
        ))}
    </Styled.VideoContainer>
  );
};

export default RelatedVideosPresenter;
