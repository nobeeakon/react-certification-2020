import React from 'react';
import { render } from '@testing-library/react';

import customRenderGlobalProviders from '../../../utils/tests/customRenders/customRenderGlobalProviders';

import VideoList from './VideoList.component';

import useVideos from '../../../utils/hooks/useVideos';

jest.mock('../../../utils/hooks/useVideos');

describe('Testing VideoList', () => {
  describe('Testing CardList rendering', () => {
    it('Should display loading message, when isLoading is true', () => {
      useVideos.mockReturnValueOnce({ videoList: [], isLoading: true });

      const { getByText } = render(<VideoList />);

      expect(getByText(/loading/i)).toBeInTheDocument();
    });

    it('Should show "something went wrong", when error is true', () => {
      useVideos.mockReturnValueOnce({ videoList: [], isLoading: false, error: true });

      const { getByText } = render(<VideoList />);

      expect(getByText(/somethig went wrong/i)).toBeInTheDocument();
    });

    it('should display "No Video Found" when result is empty array and isLoading is false', async () => {
      useVideos.mockReturnValueOnce({ videoList: [], isLoading: false });

      const { container } = render(<VideoList />);

      expect(container).toHaveTextContent(/no video found/i);
    });

    it('should display video Cards when array is returned', async () => {
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
      const returnedArray = [
        {
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
        {
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
      ];

      useVideos.mockReturnValueOnce({ videoList: returnedArray, isLoading: false });
      const searchString = 'seachString';

      const { getByText } = customRenderGlobalProviders(
        <VideoList searchString={searchString} />
      );

      expect(getByText(/title1/i)).toBeInTheDocument();
      expect(getByText(/title2/i)).toBeInTheDocument();
    });
  });
});
