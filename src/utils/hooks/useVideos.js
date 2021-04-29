import { useState, useEffect } from 'react';
import axios from 'axios';

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
 * @param {ref} isMountedRef - reference obtained from the useRef hook. Used to prevent
 *                             undesired update after unmount
 * @returns { { videoList: (Array.<Object>), isLoading:boolean, error:boolean }}
 */
function useVideos(searchedString, requestType, isMountedRef) {
  const [videoList, setVideoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let result;
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source(); // to cancel request when unmount

    const fetchData = async () => {
      // ref used to prevent update unmounted
      if (isMountedRef.current) setIsLoading(true);

      try {
        switch (requestType) {
          case REQUEST_API_TYPES.SEARCH_BY_TERM: {
            result = await fetchVideoListByTerm(searchedString, source);
            break;
          }
          case REQUEST_API_TYPES.SEARCH_RELATED_VIDEOS: {
            result = await fetchRelatedVideos(searchedString, source);
            break;
          }
          case REQUEST_API_TYPES.VIDEO_INFO: {
            result = await fetchVideoInfo(searchedString, source);
            break;
          }
          default:
            throw new Error('Requested API type is not valid');
        }

        if (result) {
          // ref used to prevent update unmounted
          if (isMountedRef.current) setVideoList(result);
        }

        if (!result) {
          // if result is null, there was an error
          // ref used to prevent update unmounted
          if (isMountedRef.current) setError(true);
        }
      } catch (e) {
        if (!axios.isCancel(e)) {
          // ref used to prevent update unmounted
          if (isMountedRef.current) setError(true);
          console.log('Error while fetching videos:', e);
        }
      } finally {
        // ref used to prevent update unmounted
        if (isMountedRef.current) setIsLoading(false);
      }
    };

    // ref used to prevent update unmounted
    if (isMountedRef.current) fetchData();

    return () => {
      source.cancel('axios cancelled. Unmounting element');
    };
  }, [searchedString, requestType, isMountedRef]);

  return { videoList, isLoading, error };
}

export default useVideos;
