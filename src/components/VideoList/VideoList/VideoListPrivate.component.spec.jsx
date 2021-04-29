import React from 'react';

import customRenderGlobalProviders from '../../../utils/tests/customRenders/customRenderGlobalProviders';

import VideoListPrivate from './VideoListPrivate.component';

import { storage } from '../../../utils/storage';

jest.spyOn(storage, 'get');
jest.spyOn(storage, 'set');

afterEach(() => {
  jest.clearAllMocks();
});

describe('Testing VideoList', () => {
  it('should call storage and display the list elements', () => {
    const snippet = {
      publishedAt: '2019-09-30T23:54:32Z',
      channelId: 'UCPGzT4wecuWM0BH9mPiulXg',
      title: 'title1',
      description: 'description1',
      thumbnails: {
        default: {
          url: 'thumbUrl',
        },
        medium: {
          url: 'thumbUrl',
        },
        high: {
          url: 'thumbUrl',
        },
      },
      channelTitle: 'Wizeline',
      liveBroadcastContent: 'none',
      publishTime: '2019-09-30T23:54:32Z',
    };
    const returnedObj = {
      nmXMgqjQzlsas: {
        kind: 'youtube#searchResult',
        etag: 'erqeM78PZDWIBe8qOGHGM2WdSE8',
        id: {
          kind: 'youtube#video',
          videoId: 'nmXMgqjQzlsas',
        },
        snippet: {
          ...snippet,
          title: 'title1',
          description: 'description1',
        },
      },
      nmXMgqjQzls: {
        kind: 'youtube#searchResult',
        etag: 'erqeM78PZDWIBe8qOGHGM2WdSE8',
        id: {
          kind: 'youtube#video',
          videoId: 'nmXMgqjQzls',
        },

        snippet: {
          ...snippet,
          title: 'title2',
          description: 'description2',
        },
      },
    };
    storage.get.mockReturnValue(returnedObj);

    const { getByText } = customRenderGlobalProviders(<VideoListPrivate />);

    expect(storage.get).toBeCalled();

    expect(getByText(/title1/i)).toBeInTheDocument();
    expect(getByText(/title2/i)).toBeInTheDocument();
  });
});
