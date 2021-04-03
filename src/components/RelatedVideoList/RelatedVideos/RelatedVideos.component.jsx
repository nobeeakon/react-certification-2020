import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { VideoContainer, NoVideoFound } from './RelatedVideos.styled';
import RelatedVideoCard from '../RelatedVideoCard';

import useVideos from '../../../utils/hooks/useVideos';

import getVideoKey from '../../../utils/functions/getVideoKey';

import { REQUEST_API_TYPES } from '../../../utils/constants';
import { queryWatchUrl } from '../../../utils/functions/routes';

const RelatedVideos = ({ relatedToVideoId }) => {
  const history = useHistory();

  const REQ_TYPE = REQUEST_API_TYPES.SEARCH_RELATED_VIDEOS;
  const { videoList, isLoading } = useVideos(relatedToVideoId, REQ_TYPE);

  const goToVideo = (videoId, snippet) => {
    if (snippet) {
      const watchURL = queryWatchUrl(videoId);
      history.push(watchURL);
    }
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
            <RelatedVideoCard
              goToVideoHandler={() => goToVideo(video.id.videoId, video?.snippet)}
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
