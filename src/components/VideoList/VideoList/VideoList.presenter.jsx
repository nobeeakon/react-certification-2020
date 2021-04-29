import React from 'react';

import * as Styled from './VideoList.styled';
import VideoListCard from '../VideoListCard';

import getVideoKey from '../../../utils/functions/getVideoKey';

const CardListPresenter = ({ videoList, isInPrivateRoute, removeItem }) => {
  if (videoList.length === 0) return <Styled.Message> No Video Found :( </Styled.Message>;

  return (
    <Styled.VideoContainer>
      {videoList.map((video) =>
        video.id.videoId ? (
          <VideoListCard
            videoId={video.id.videoId}
            key={getVideoKey(video)}
            thumbUrl={video?.snippet?.thumbnails?.medium?.url}
            title={video?.snippet?.title}
            channelTitle={video?.snippet?.channelTitle}
            description={video?.snippet?.description}
            isInPrivateRoute={isInPrivateRoute}
            videoInfo={video}
            removeThisItem={() => removeItem(video.id.videoId)}
          />
        ) : null
      )}
    </Styled.VideoContainer>
  );
};

export default CardListPresenter;
