import { rest } from 'msw';
import { setupServer } from 'msw/node';

import fetchData from './fetchData';

const API_URL =
  'https://gist.githubusercontent.com/jparciga/1d4dd34fb06ba74237f8966e2e777ff5/raw/f3af25f1505deb67e2cc9ee625a633f24d8983ff/youtube-videos-mock.json';
const API_WRONGURL = 'https://gist.githubusercontent.com/jparciga/1d4dd';

describe('Testing fetchData function', () => {
  const apiServer = setupServer(
    rest.get(API_URL, (req, res, ctx) => {
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

    rest.get(API_WRONGURL, (req, res, ctx) => {
      return res(ctx.status(404));
    })
  );

  beforeAll(() => {
    apiServer.listen();
  });
  afterEach(() => apiServer.resetHandlers());
  afterAll(() => apiServer.close());

  test('it should return an Array', async () => {
    const result = await fetchData(API_URL);
    console.log(result);
    expect(result instanceof Array).toBe(true);
  });

  test('Rejects on error', () => {
    expect.assertions(1);

    return expect(fetchData(API_WRONGURL)).rejects.toThrow();
  });
});
