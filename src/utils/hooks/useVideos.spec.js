import { renderHook } from '@testing-library/react-hooks';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import useVideos from './useVideos';
import { REQUEST_API_TYPES } from '../constants';

const BASE_URL = 'https://www.googleapis.com/youtube/v3';
const SEARCH_URL = `${BASE_URL}/search`;
const VIDEO_INFO_URL = `${BASE_URL}/videos`;

describe('Testing useVideo custom Hook', () => {
  const apiServer = setupServer(
    rest.get(SEARCH_URL, (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          kind: 'youtube#searchListResponse',
          etag: 'LRviZfd_p3HDDD2uBk5Qv7zaEQU',
          nextPageToken: 'CBkQAA',
          regionCode: 'MX',
          pageInfo: {
            totalResults: 2323,
            resultsPerPage: 25,
          },
          items: [],
        })
      );
    }),

    rest.get(VIDEO_INFO_URL, (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          kind: 'youtube#searchListResponse',
          etag: 'LRviZfd_p3HDDD2uBk5Qv7zaEQU',
          items: [],
        })
      );
    })
  );

  beforeAll(() => {
    apiServer.listen();
  });
  afterEach(() => apiServer.resetHandlers());
  afterAll(() => apiServer.close());

  describe('testing search by term', () => {
    const REQ_TYPE = REQUEST_API_TYPES.SEARCH_BY_TERM;
    const SEARCH_TERM = 'wizeline';

    test('After fetching, videoList instanceof Array, isLoading = false', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useVideos(SEARCH_TERM, REQ_TYPE)
      );

      expect(result.current.videoList).toBeNull();
      expect(result.current.isLoading).toBe(true);

      await waitForNextUpdate();

      expect(result.current.videoList instanceof Array).toBe(true);
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('testing search related videos', () => {
    const REQ_TYPE = REQUEST_API_TYPES.SEARCH_RELATED_VIDEOS;
    const VIDEO_ID = 'Ks-_Mh1QhMc';

    test('After fetching, videoList instanceof Array, isLoading = false', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useVideos(VIDEO_ID, REQ_TYPE)
      );

      expect(result.current.videoList).toBeNull();
      expect(result.current.isLoading).toBe(true);

      await waitForNextUpdate();

      expect(result.current.videoList instanceof Array).toBe(true);
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('testing search related videos', () => {
    const REQ_TYPE = REQUEST_API_TYPES.VIDEO_INFO;
    const VIDEO_ID = 'Ks-_Mh1QhMc';

    test('After fetching, videoList instanceof Array, isLoading = false', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useVideos(VIDEO_ID, REQ_TYPE)
      );

      expect(result.current.videoList).toBeNull();
      expect(result.current.isLoading).toBe(true);

      await waitForNextUpdate();

      expect(result.current.videoList instanceof Array).toBe(true);
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('testing other action not listed in REQUEST_TYPE', () => {
    const REQ_TYPE = 'other';
    const VIDEO_ID = 'Ks-_Mh1QhMc';

    test('After invalid fetching type, videoList =  null ,  isLoading = false', () => {
      const { result } = renderHook(() => useVideos(VIDEO_ID, REQ_TYPE));
      expect(result.current.videoList).toBeNull();
      expect(result.current.isLoading).toBe(false);
    });
  });
});
