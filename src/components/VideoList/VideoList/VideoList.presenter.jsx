import React from 'react';

import { VideoContainer, NoVideoFound } from './VideoList.styled';
import VideoListCard from '../VideoListCard';

import getVideoKey from '../../../utils/functions/getVideoKey';

const CardListPresenter = ({ videoList, isPrivate }) => {
  return (
    <div>
      {videoList.length === 0 ? (
        <NoVideoFound> No Video Found :( </NoVideoFound>
      ) : (
        <VideoContainer>
          {videoList.map((video) =>
            video.id.videoId ? (
              <VideoListCard
                videoId={video.id.videoId}
                key={getVideoKey(video)}
                thumbUrl={video?.snippet?.thumbnails?.medium?.url}
                title={video?.snippet?.title}
                author={video?.snippet?.channelTitle}
                description={video?.snippet?.description}
                isPrivate={isPrivate}
                videoInfo={video}
              />
            ) : null
          )}
        </VideoContainer>
      )}
    </div>
  );
};

export default CardListPresenter;
