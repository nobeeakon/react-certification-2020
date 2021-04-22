import React, { useState, useEffect } from 'react';

import { NoVideoFound } from './VideoList.styled';

import { storage } from '../../../utils/storage';
import { SAVED_WATCH_LATER_VIDEOS_STORAGE_KEY } from '../../../utils/constants';

import CardListPresenter from './VideoList.presenter';

const CardListPrivate = () => {
  const [videoList, setVideoList] = useState(null);

  useEffect(() => {
    const storedVideos = storage.get(SAVED_WATCH_LATER_VIDEOS_STORAGE_KEY) || {};

    setVideoList(Object.values(storedVideos));
  }, []);

  if (!videoList) return <NoVideoFound>Loading...</NoVideoFound>;

  return <CardListPresenter videoList={videoList} isPrivate />;
};

export default CardListPrivate;
