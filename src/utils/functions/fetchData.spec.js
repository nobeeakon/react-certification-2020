import { rest } from 'msw';
import { setupServer } from 'msw/node';

// functions to test
import { fetchVideoListByTerm, fetchRelatedVideos, fetchVideoInfo } from './fetchData';

const BASE_URL = 'https://www.googleapis.com/youtube/v3';
const SEARCH_URL = `${BASE_URL}/search`;
const VIDEO_INFO_URL = `${BASE_URL}/videos`;

const mokedSource = jest.fn();

describe('Testing youtube API requests', () => {
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

  describe('Testing fetchVideoListByTerm and fetchRelatedVideos functions', () => {
    test('fetchVideoListByTerm should return an Array', async () => {
      const result = await fetchVideoListByTerm('wizeline', mokedSource);
      expect(result instanceof Array).toBe(true);
    });

    test('fetchRelatedVideos should return an Array', async () => {
      const result = await fetchRelatedVideos('wizeline', mokedSource);
      expect(result instanceof Array).toBe(true);
    });
  });

  describe('Testing fetchfetchVideoInfo function', () => {
    test('fetchVideoInfo should return an Array', async () => {
      const result = await fetchVideoInfo('Ks-_Mh1QhMc', mokedSource);
      expect(result instanceof Array).toBe(true);
    });
  });
});
