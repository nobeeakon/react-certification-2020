const getVideoKey = (video) => {
  return video.id.videoId || video.etag || video.snippet.publishTime;
};

export default getVideoKey;
