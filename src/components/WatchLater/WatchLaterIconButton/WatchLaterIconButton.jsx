import React, { useEffect } from 'react';

import { AiFillClockCircle } from 'react-icons/ai';
import { ImCheckboxChecked } from 'react-icons/im';
import { storage } from '../../../utils/storage';
import { SAVED_WATCH_LATER_VIDEOS_STORAGE_KEY } from '../../../utils/constants';

import { useGlobalContext } from '../../../providers/Global/Global.provider';

import * as Styled from './WatchLaterIconButton.styled';

const WatchLaterButton = ({
  videoInfo,
  videoId,
  isWatchLaterSelected,
  setIsWatchLaterSelected,
  isInPrivateRoute,
  removeVideoItem,
}) => {
  const { globalState } = useGlobalContext();

  const { isAuthenticated } = globalState;

  useEffect(() => {
    const videosStored = storage.get(SAVED_WATCH_LATER_VIDEOS_STORAGE_KEY) || {};

    const tmpIsVideoStored = Boolean(videosStored[videoId]);
    setIsWatchLaterSelected(tmpIsVideoStored);
  }, [videoId, setIsWatchLaterSelected]);

  // only show when  logged in
  if (!isAuthenticated) return null;

  const handleWatchLater = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const videosStored = storage.get(SAVED_WATCH_LATER_VIDEOS_STORAGE_KEY) || {};

    if (videosStored[videoId]) {
      delete videosStored[videoId];
      setIsWatchLaterSelected(false);
      if (isInPrivateRoute) removeVideoItem(); // remove from shown list
    } else {
      videosStored[videoId] = videoInfo;
      setIsWatchLaterSelected(true);
    }

    // local storage
    storage.set(SAVED_WATCH_LATER_VIDEOS_STORAGE_KEY, videosStored);
  };

  const iconTitle = isWatchLaterSelected
    ? 'Remove from Watch Later List'
    : 'Add to Watch Later List';

  return (
    <Styled.StyledWatchLaterButton
      onClick={handleWatchLater}
      data-testid="watch-later-button"
    >
      {!isWatchLaterSelected ? (
        <AiFillClockCircle data-testid="clock-icon-testid" title={iconTitle} />
      ) : (
        <ImCheckboxChecked title={iconTitle} data-testid="checked-icon-testid" />
      )}
    </Styled.StyledWatchLaterButton>
  );
};

export default WatchLaterButton;
