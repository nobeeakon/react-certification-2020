import { useState, useCallback, useEffect } from 'react';

import {
  fetchVideoListByTerm,
  fetchRelatedVideos,
  fetchVideoInfo,
} from '../functions/fetchData';

import { REQUEST_API_TYPES } from '../constants';

/**
 *  custom hook used to fetch videos from youtube API V3
 * @param {string} searchedString - the string to be searched, can be a term or videoId
 * @param {string} requestType - one of many research types defined in REQUEST_API
 * @returns { { videoList: (null|Array.<Object>), isLoading:boolean }}
 */
function useVideos(searchedString, requestType) {
  const [videoList, setVideoList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      switch (requestType) {
        case REQUEST_API_TYPES.SEARCH_BY_TERM:
          setVideoList(await fetchVideoListByTerm(searchedString));
          break;
        case REQUEST_API_TYPES.SEARCH_RELATED_VIDEOS:
          setVideoList(await fetchRelatedVideos(searchedString));
          break;
        case REQUEST_API_TYPES.VIDEO_INFO:
          setVideoList(await fetchVideoInfo(searchedString));
          break;

        default:
          throw new Error('Requested API type is not valid');
      }
    } catch (error) {
      console.log('Error while fetching videos:', error);
    } finally {
      setIsLoading(false);
    }
  }, [requestType, searchedString]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { videoList, isLoading };
}

export default useVideos;
