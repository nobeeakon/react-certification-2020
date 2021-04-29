import React, { useState, useEffect } from 'react';

import * as Styled from './VideoList.styled';

import { storage } from '../../../utils/storage';
import { SAVED_WATCH_LATER_VIDEOS_STORAGE_KEY } from '../../../utils/constants';

import CardListPresenter from './VideoList.presenter';

const CardListPrivate = () => {
  const [videoList, setVideoList] = useState(null);

  useEffect(() => {
    const storedVideos = storage.get(SAVED_WATCH_LATER_VIDEOS_STORAGE_KEY) || {};
    setVideoList(Object.values(storedVideos));
  }, []);

  const removeItem = (id) => {
    const newList = videoList.filter((video) => video.id.videoId !== id);
    setVideoList(newList);
  };

  if (!videoList) return <Styled.Message>Loading...</Styled.Message>;

  return (
    <CardListPresenter videoList={videoList} removeItem={removeItem} isInPrivateRoute />
  );
};

export default CardListPrivate;
