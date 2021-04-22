import React, { useState, useEffect } from 'react';

import { AiFillClockCircle } from 'react-icons/ai';
import { ImCheckboxChecked } from 'react-icons/im';
import { storage } from '../../../utils/storage';
import { SAVED_WATCH_LATER_VIDEOS_STORAGE_KEY } from '../../../utils/constants';

import { useGlobalContext } from '../../../providers/Global/Global.provider';

import * as Styled from './WatchLaterIconButton.styled';

const WatchLaterButton = ({ videoInfo, videoId, setIsWatchLaterSelected }) => {
  const { globalState } = useGlobalContext();
  const [isVideoSaved, setIsVideoSaved] = useState(false);

  const { isAuthenticated } = globalState;

  useEffect(() => {
    const videosStored = storage.get(SAVED_WATCH_LATER_VIDEOS_STORAGE_KEY) || {};

    const tmpIsVideoStored = Boolean(videosStored[videoId]);
    setIsVideoSaved(tmpIsVideoStored);
  }, [videoId]);

  // update
  useEffect(() => {
    setIsWatchLaterSelected(isVideoSaved);
  }, [isVideoSaved, setIsWatchLaterSelected]);

  // only show when  logged in
  if (!isAuthenticated) return null;

  const handleWatchLater = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const videosStored = storage.get(SAVED_WATCH_LATER_VIDEOS_STORAGE_KEY) || {};

    if (videosStored[videoId]) {
      delete videosStored[videoId];
      setIsVideoSaved(false);
    } else {
      videosStored[videoId] = videoInfo;
      setIsVideoSaved(true);
    }

    storage.set(SAVED_WATCH_LATER_VIDEOS_STORAGE_KEY, videosStored);
  };

  const iconTitle = isVideoSaved
    ? 'Remove from Watch Later List'
    : 'Add to Watch Later List';

  return (
    <Styled.StyledWatchLaterButton
      onClick={handleWatchLater}
      data-testid="watch-later-button"
    >
      {!isVideoSaved ? (
        <AiFillClockCircle data-testid="clock-icon-testid" title={iconTitle} />
      ) : (
        <ImCheckboxChecked title={iconTitle} data-testid="checked-icon-testid" />
      )}
    </Styled.StyledWatchLaterButton>
  );
};

export default WatchLaterButton;
