import axios from 'axios';

const API_SECRET_KEY = process.env.REACT_APP_YT_API_KEY;

const BASE_URL = 'https://www.googleapis.com/youtube/v3';
const MAX_RESULTS = 25;

/* const cancelToken = axios.CancelToken;
export const source = cancelToken.source(); */

const youtubeAPI = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_SECRET_KEY,
  },
});

// 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=surfing&key=[YOUR_API_KEY]'
// TODO: maybe at some point add functionality to change type param (videos, playlists, channels)
export const fetchVideoListByTerm = async (searchTerm, source) => {
  try {
    const response = await youtubeAPI.get('/search', {
      params: {
        part: 'snippet',
        maxResults: MAX_RESULTS,
        q: searchTerm,
        type: 'video',
      },
      cancelToken: source.token,
    });

    // filter out all non available videos
    const itemsAvailable = response.data.items.filter(
      (video) => video.id.videoId && video.snippet
    );
    return itemsAvailable;
  } catch (e) {
    if (!axios.isCancel(e)) {
      console.log(
        `Error while fetching videos related with the TERM: ${searchTerm}. `,
        e
      );
      return null;
    }
  }
};

// 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=Ks-_Mh1QhMc&type=video&key=[YOUR_API_KEY]' \
export const fetchRelatedVideos = async (videoId, source) => {
  try {
    const response = await youtubeAPI.get('/search', {
      params: {
        part: 'snippet',
        maxResults: MAX_RESULTS,
        relatedToVideoId: videoId,
        type: 'video',
      },
      cancelToken: source.token,
    });

    return response.data.items;
  } catch (e) {
    if (!axios.isCancel(e)) {
      console.log(`Error while fetching related videos, of the videoId: ${videoId}. `, e);
      return null;
    }
  }
};

// https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc&key=[YOUR_API_KEY]
export const fetchVideoInfo = async (videoId, source) => {
  try {
    const response = await youtubeAPI.get('/videos', {
      params: {
        part: ['snippet', 'contentDetails', 'statistics'].join(', '),
        id: videoId,
      },
      cancelToken: source.token,
    });

    return response.data.items;
  } catch (e) {
    if (!axios.isCancel(e)) {
      console.log(`Error while fetching video Info, of the videoId: ${videoId}. `, e);
      return null;
    }
  }
};
