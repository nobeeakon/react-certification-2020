import getVideoKey from './getVideoKey';

describe('Testing getVideoKey function', () => {
  test('Return videoId when has video.id.videoId', async () => {
    const video = {
      etag: '_PVKwNJf_qw9nukFeRFOtQ837o0',
      id: {
        videoId: 'HYyRZiwBWc8',
      },
      snippet: {
        publishTime: '2014-09-27T01:39:18Z',
      },
    };
    const { videoId } = video.id;
    const result = getVideoKey(video);
    expect(result).toBe(videoId);
  });

  test('Return etag when not has video.id.videoId', async () => {
    const video = {
      etag: '_PVKwNJf_qw9nukFeRFOtQ837o0',
      id: {},
      snippet: {
        publishTime: '2014-09-27T01:39:18Z',
      },
    };
    const { etag } = video;
    const result = getVideoKey(video);
    expect(result).toBe(etag);
  });
  test('Return video.snippet.publishTime when not has video.id.videoId nor etag', async () => {
    const video = {
      id: {},
      snippet: {
        publishTime: '2014-09-27T01:39:18Z',
      },
    };
    const { publishTime } = video.snippet;
    const result = getVideoKey(video);
    expect(result).toBe(publishTime);
  });
});
