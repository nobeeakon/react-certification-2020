import React from 'react';
import { render } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import GlobalContextProvider from '../../../providers/Global';
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

      const { getByText } = render(
        <BrowserRouter>
          <GlobalContextProvider>
            <ThemesProvider>
              <VideoList searchString={searchString} />
            </ThemesProvider>
          </GlobalContextProvider>
        </BrowserRouter>
      );

      expect(useVideos).toBeCalledWith(searchString, REQ_TYPE);
      expect(getByText(/title1/i)).toBeInTheDocument();
      expect(getByText(/title2/i)).toBeInTheDocument();
    });
  });
});
