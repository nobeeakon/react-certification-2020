import React from 'react';
import { render } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import DarkProvider from '../../../providers/DarkMode';
import ThemesProvider from '../../../providers/Theme';

import VideoList from './VideoList.component';

import useVideos from '../../../utils/hooks/useVideos';

import { REQUEST_API_TYPES } from '../../../utils/constants';

jest.mock('../../../utils/hooks/useVideos');

describe('Testing VideoList', () => {
  const REQ_TYPE = REQUEST_API_TYPES.SEARCH_BY_TERM;

  describe('Testing CardList rendering', () => {
    it('Should display loading message, when isLoading is true', () => {
      useVideos.mockReturnValueOnce({ videoList: null, isLoading: true });

      const { container } = render(<VideoList />);

      expect(container).toHaveTextContent(/loading/i);
    });

    it('Should return null, when videoList is null and isLoading is false', () => {
      useVideos.mockReturnValueOnce({ videoList: null, isLoading: false });

      const { container } = render(<VideoList />);

      expect(container).toBeEmptyDOMElement();
    });

    it('should display "No Video Found" when result is empty array and isLoading is false', async () => {
      useVideos.mockReturnValueOnce({ videoList: [], isLoading: false });

      const { container } = render(<VideoList />);

      expect(container).toHaveTextContent(/no video found/i);
    });

    it('should display video Cards when array is returned', async () => {
      const returnedArray = [
        {
          kind: 'youtube#searchResult',
          etag: 'erqeM78PZDWIBe8qOGHGM2WdSE8',
          id: {
            kind: 'youtube#video',
            videoId: 'nmXMgqjQzlsas',
          },
          snippet: {
            publishedAt: '2019-09-30T23:54:32Z',
            channelId: 'UCPGzT4wecuWM0BH9mPiulXg',
            title: 'title1',
            description: 'description1',
            thumbnails: {
              default: {
                url: 'https://i.ytimg.com/vi/nmXMgqjQzls/default.jpg',
                width: 120,
                height: 90,
              },
              medium: {
                url: 'https://i.ytimg.com/vi/nmXMgqjQzls/mqdefault.jpg',
                width: 320,
                height: 180,
              },
              high: {
                url: 'https://i.ytimg.com/vi/nmXMgqjQzls/hqdefault.jpg',
                width: 480,
                height: 360,
              },
            },
            channelTitle: 'Wizeline',
            liveBroadcastContent: 'none',
            publishTime: '2019-09-30T23:54:32Z',
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
            publishedAt: '2019-09-30T23:54:32Z',
            channelId: 'UCPGzT4wecuWM0BH9mPiulXg',
            title: 'title2',
            description: 'description2',
            thumbnails: {
              default: {
                url: 'https://i.ytimg.com/vi/nmXMgqjQzls/default.jpg',
                width: 120,
                height: 90,
              },
              medium: {
                url: 'https://i.ytimg.com/vi/nmXMgqjQzls/mqdefault.jpg',
                width: 320,
                height: 180,
              },
              high: {
                url: 'https://i.ytimg.com/vi/nmXMgqjQzls/hqdefault.jpg',
                width: 480,
                height: 360,
              },
            },
            channelTitle: 'Wizeline',
            liveBroadcastContent: 'none',
            publishTime: '2019-09-30T23:54:32Z',
          },
        },
      ];

      useVideos.mockReturnValueOnce({ videoList: returnedArray, isLoading: false });
      const searchString = 'seachString';

      const { getByText } = render(
        <BrowserRouter>
          <DarkProvider>
            <ThemesProvider>
              <VideoList searchString={searchString} />
            </ThemesProvider>
          </DarkProvider>
        </BrowserRouter>
      );

      expect(useVideos).toBeCalledWith(searchString, REQ_TYPE);
      expect(getByText(/title1/i)).toBeInTheDocument();
      expect(getByText(/title2/i)).toBeInTheDocument();
    });
  });
});