import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import RelatedVideosPresenter from './RelatedVideos.presenter';

import { storage } from '../../../utils/storage';
import { SAVED_WATCH_LATER_VIDEOS_STORAGE_KEY } from '../../../utils/constants';

import * as Styled from './RelatedVideos.styled';

const RelatedPrivateVideos = ({ relatedToVideoId }) => {
  const [videoList, setVideoList] = useState(null);

  useEffect(() => {
    const storedVideos = storage.get(SAVED_WATCH_LATER_VIDEOS_STORAGE_KEY);

    // to display the rest of the videos,
    // remove video item from stored videos list
    delete storedVideos[relatedToVideoId];

    setVideoList(Object.values(storedVideos));
  }, [relatedToVideoId]);

  const removeItem = (id) => {
    const newList = videoList.filter((video) => video.id.videoId !== id);
    setVideoList(newList);
  };

  if (!videoList) return <Styled.Message>Loading...</Styled.Message>;

  return (
    <RelatedVideosPresenter
      videoList={videoList}
      removeItem={removeItem}
      isInPrivateRoute
    />
  );
};

RelatedPrivateVideos.propTypes = {
  relatedToVideoId: PropTypes.string.isRequired,
};

export default RelatedPrivateVideos;
