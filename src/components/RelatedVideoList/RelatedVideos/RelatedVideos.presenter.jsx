import React from 'react';

import RelatedVideoCard from '../RelatedVideoCard';

import { VideoContainer, NoVideoFound } from './RelatedVideos.styled';

import getVideoKey from '../../../utils/functions/getVideoKey';

const RelatedVideosPresenter = ({ videoList, isPrivate }) => {
  return (
    <div>
      {videoList.length === 0 ? (
        <NoVideoFound> No Video Found :( </NoVideoFound>
      ) : (
        <VideoContainer>
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
                isPrivate={isPrivate}
              />
            ))}
        </VideoContainer>
      )}
    </div>
  );
};

export default RelatedVideosPresenter;
