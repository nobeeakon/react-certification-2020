import { rest } from 'msw';

import { SEARCH_RESPONSE } from './responses/search';
import { VIDEO_INFO_RESPONSE } from './responses/videoInfo';

const BASE_URL = 'https://www.googleapis.com/youtube/v3';
const SEARCH_URL = `${BASE_URL}/search`;
const VIDEO_INFO_URL = `${BASE_URL}/videos`;

export const handlers = [
  rest.get(SEARCH_URL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(SEARCH_RESPONSE));
  }),
  rest.get(VIDEO_INFO_URL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(VIDEO_INFO_RESPONSE));
  }),
  rest.get('/user', null),
];
