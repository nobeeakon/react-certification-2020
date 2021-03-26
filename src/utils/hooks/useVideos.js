import { useState, useEffect } from 'react';

import fetchData from '../functions/fetchData';

const API_URL =
  'https://gist.githubusercontent.com/jparciga/1d4dd34fb06ba74237f8966e2e777ff5/raw/f3af25f1505deb67e2cc9ee625a633f24d8983ff/youtube-videos-mock.json';

function useVideos() {
  const [videoList, setVideoList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await fetchData(API_URL);
        setVideoList(data);
        setIsLoading(false);
      } catch (error) {
        console.log('Error while fetching videos:', error);
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return [videoList, isLoading];
}

export default useVideos;
