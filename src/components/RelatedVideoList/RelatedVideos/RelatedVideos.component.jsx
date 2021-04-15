import React from 'react';
import PropTypes from 'prop-types';

import { VideoContainer, NoVideoFound } from './RelatedVideos.styled';
import RelatedVideoCard from '../RelatedVideoCard';

import useVideos from '../../../utils/hooks/useVideos';

import getVideoKey from '../../../utils/functions/getVideoKey';

import { REQUEST_API_TYPES } from '../../../utils/constants';

const RelatedVideos = ({ relatedToVideoId }) => {
  const REQ_TYPE = REQUEST_API_TYPES.SEARCH_RELATED_VIDEOS;
  const { videoList, isLoading } = useVideos(relatedToVideoId, REQ_TYPE);

  if (isLoading) return <NoVideoFound>Loading...</NoVideoFound>;
  if (!videoList) return null;

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
                isAvailable={!!video?.snippet}
                videoId={video.id.videoId}
                key={getVideoKey(video)}
                thumbUrl={video?.snippet?.thumbnails?.default?.url}
                title={video?.snippet?.title}
                channelTitle={video?.snippet?.channelTitle}
              />
            ))}
        </VideoContainer>
      )}
    </div>
  );
};

RelatedVideos.propTypes = {
  relatedToVideoId: PropTypes.string.isRequired,
};

export default RelatedVideos;
