import React from 'react';
import { useHistory } from 'react-router-dom';

import { VideoContainer, NoVideoFound } from './VideoList.styled';
import VideoCard from '../VideoCard';

import useVideos from '../../utils/hooks/useVideos';

import getVideoKey from '../../utils/functions/getVideoKey';

const CardList = () => {
  const videoList = useVideos();

  const history = useHistory();

  const goToVideo = (e, etag) => {
    history.push(`/${etag}`);
  };

  return (
    <div>
      {videoList &&
        (videoList.length ? (
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
        ) : (
          <NoVideoFound> No Video Found :( </NoVideoFound>
        ))}
    </div>
  );
};

export default CardList;
