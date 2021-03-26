import React from 'react';
import { useHistory } from 'react-router-dom';

import { VideoContainer, NoVideoFound } from './VideoList.styled';
import VideoCard from '../VideoCard';

import useVideos from '../../utils/hooks/useVideos';

import getVideoKey from '../../utils/functions/getVideoKey';

const CardList = () => {
  const history = useHistory();

  const [videoList, isLoading] = useVideos();

  const goToVideo = (e, etag) => {
    history.push(`/${etag}`);
  };

  if (isLoading) return <NoVideoFound>Loading...</NoVideoFound>;
  if (!videoList) return null;

  return (
    <div>
      {videoList.length === 0 ? (
        <NoVideoFound> No Video Found :( </NoVideoFound>
      ) : (
        <VideoContainer>
          {videoList.map((video) => (
            <VideoCard
              goToVideoHandler={(e) => goToVideo(e, video.etag)}
              key={getVideoKey(video)}
              thumbUrl={video.snippet.thumbnails.medium.url}
              title={video.snippet.title}
              author={video.snippet.channelTitle}
              description={video.snippet.description}
            />
          ))}
        </VideoContainer>
      )}
    </div>
  );
};

export default CardList;
