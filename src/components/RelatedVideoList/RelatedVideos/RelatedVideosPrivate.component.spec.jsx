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
});
