import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import RelatedVideosPresenter from './RelatedVideos.presenter';

import { storage } from '../../../utils/storage';
import { SAVED_WATCH_LATER_VIDEOS_STORAGE_KEY } from '../../../utils/constants';

import { NoVideoFound } from './RelatedVideos.styled';

const RelatedPrivateVideos = ({ relatedToVideoId }) => {
  const [videoList, setVideoList] = useState(null);

  useEffect(() => {
    const storedVideos = storage.get(SAVED_WATCH_LATER_VIDEOS_STORAGE_KEY);

    // remove video item from stored videos
    delete storedVideos[relatedToVideoId];

    setVideoList(Object.values(storedVideos));
  }, [relatedToVideoId]);

  if (!videoList) return <NoVideoFound>Loading...</NoVideoFound>;

  return <RelatedVideosPresenter videoList={videoList} isPrivate />;
};

RelatedPrivateVideos.propTypes = {
  relatedToVideoId: PropTypes.string.isRequired,
};

export default RelatedPrivateVideos;
