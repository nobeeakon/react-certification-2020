import React from 'react';

import RelatedPrivateVideos from './RelatedVideosPrivate.component';

import { storage } from '../../../utils/storage';

import customRenderGlobalProviders from '../../../utils/tests/customRenders/customRenderGlobalProviders';

jest.spyOn(storage, 'get');
jest.spyOn(storage, 'set');

afterEach(() => {
  jest.clearAllMocks();
});

describe('Related private videos', () => {
  it('should call storage', () => {
    storage.get.mockReturnValue({ videoId1: {}, videoId2: {} });
    customRenderGlobalProviders(<RelatedPrivateVideos relatedToVideoId="videoId2" />);
    expect(storage.get).toBeCalledTimes(1);
  });

  it('should remove selected element from displayed list', () => {
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

    const { getByText, queryByText } = customRenderGlobalProviders(
      <RelatedPrivateVideos relatedToVideoId="nmXMgqjQzlsas" />
    );

    expect(storage.get).toBeCalled();

    expect(queryByText(/title1/i)).not.toBeInTheDocument();
    expect(getByText(/title2/i)).toBeInTheDocument();
  });
});
