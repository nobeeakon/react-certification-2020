import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { VideoContainer, NoVideoFound } from './VideoList.styled';
import VideoListCard from '../VideoListCard';

import useVideos from '../../../utils/hooks/useVideos';

import getVideoKey from '../../../utils/functions/getVideoKey';

import { REQUEST_API_TYPES } from '../../../utils/constants';
import { queryWatchUrl } from '../../../utils/functions/routes';

const CardList = ({ searchString }) => {
  const history = useHistory();

  const REQ_TYPE = REQUEST_API_TYPES.SEARCH_BY_TERM;
  const { videoList, isLoading } = useVideos(searchString, REQ_TYPE);

  const goToVideo = (e, videoId) => {
    const watchURL = queryWatchUrl(videoId);
    history.push(watchURL);
  };

  if (isLoading) return <NoVideoFound>Loading...</NoVideoFound>;
  if (!videoList) return null;

  return (
    <div>
      {videoList.length === 0 ? (
        <NoVideoFound> No Video Found :( </NoVideoFound>
      ) : (
        <VideoContainer>
          {videoList.map((video) =>
            video.id.videoId ? (
              <VideoListCard
                goToVideoHandler={(e) => goToVideo(e, video.id.videoId)}
                key={getVideoKey(video)}
                thumbUrl={video?.snippet?.thumbnails?.medium?.url}
                title={video?.snippet?.title}
                author={video?.snippet?.channelTitle}
                description={video?.snippet?.description}
              />
            ) : null
          )}
        </VideoContainer>
      )}
    </div>
  );
};

CardList.propTypes = {
  searchString: PropTypes.string,
};

CardList.defaultProps = {
  searchString: 'Wizeline',
};

export default CardList;
