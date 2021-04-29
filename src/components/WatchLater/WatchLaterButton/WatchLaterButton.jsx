import React, { useState, useEffect } from 'react';

import { ImCheckboxChecked } from 'react-icons/im';

import { storage } from '../../../utils/storage';
import { SAVED_WATCH_LATER_VIDEOS_STORAGE_KEY } from '../../../utils/constants';

import { useGlobalContext } from '../../../providers/Global/Global.provider';

import * as Styled from './WatchLaterButton.styled';

// used in the videoDetail view
const WatchLaterButton = ({ videoInfo, videoId }) => {
  const { globalState } = useGlobalContext();
  const [isVideoSaved, setIsVideoSaved] = useState(false);

  const { isAuthenticated } = globalState;

  useEffect(() => {
    const videosStored = storage.get(SAVED_WATCH_LATER_VIDEOS_STORAGE_KEY) || {};

    const tmpIsVideoStored = Boolean(videosStored[videoId]);
    setIsVideoSaved(tmpIsVideoStored);
  }, [videoId]);

  // only show when  logged in
  if (!isAuthenticated) return null;

  const handleWatchLater = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Need to do this, since in this case it doesn't have this piece of info
    const tmpVideoInfo = { ...videoInfo, id: { videoId } };
    const videosStored = storage.get(SAVED_WATCH_LATER_VIDEOS_STORAGE_KEY) || {};

    if (videosStored[videoId]) {
      delete videosStored[videoId];
      setIsVideoSaved(false);
    } else {
      videosStored[videoId] = tmpVideoInfo;
      setIsVideoSaved(true);
    }

    storage.set(SAVED_WATCH_LATER_VIDEOS_STORAGE_KEY, videosStored);
  };

  return (
    <Styled.StyledWatchLaterButton
      onClick={handleWatchLater}
      data-testid="watch-later-button"
    >
      {isVideoSaved ? (
        <>
          <ImCheckboxChecked data-testid="checked-icon-testid" /> Watch Later
        </>
      ) : (
        <>Watch Later</>
      )}
    </Styled.StyledWatchLaterButton>
  );
};

export default WatchLaterButton;
