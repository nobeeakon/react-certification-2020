import React from 'react';
import { render } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import DarkProvider from '../../../providers/DarkMode';
import ThemesProvider from '../../../providers/Theme';

import RelatedVideos from './RelatedVideos.component';

import useVideos from '../../../utils/hooks/useVideos';

import { REQUEST_API_TYPES } from '../../../utils/constants';

jest.mock('../../../utils/hooks/useVideos');

describe('Testing RelatedVideos component', () => {
  const REQ_TYPE = REQUEST_API_TYPES.SEARCH_RELATED_VIDEOS;
  const relatedToVideoId = 'videoId';
  describe('Testing RelatedVideos rendering', () => {
    it('Should display loading message, when isLoading is true', () => {
      useVideos.mockReturnValueOnce({ videoList: null, isLoading: true });

      const { getByText } = render(<RelatedVideos relatedToVideoId={relatedToVideoId} />);

      expect(getByText(/loading/i)).toBeInTheDocument();
    });

    it('Should return null, when videoList is null and isLoading is false', () => {
      useVideos.mockReturnValueOnce({ videoList: null, isLoading: false });

      const { container } = render(<RelatedVideos relatedToVideoId={relatedToVideoId} />);

      expect(container).toBeEmptyDOMElement();
    });

    it('should display "No Video Found" when result is empty array and isLoading is false', async () => {
      useVideos.mockReturnValueOnce({ videoList: [], isLoading: false });

      const { getByText } = render(<RelatedVideos relatedToVideoId={relatedToVideoId} />);

      expect(getByText(/no video found/i)).toBeInTheDocument();
    });

    it('should display only items with id.videoId', async () => {
      const thumbnails = {
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
      };
      const returnedArray = [
        {
          kind: 'youtube#searchResult',
          etag: '_PVKwNJf_qw9nukFeRFOtQ837o0',
          id: {
            kind: 'youtube#channel',
            channelId: 'UCPGzT4wecuWM0BH9mPiulXg',
          },
          snippet: {
            publishedAt: '2014-09-27T01:39:18Z',
            channelId: 'UCPGzT4wecuWM0BH9mPiulXg',
            title: 'title1',
            description: 'description1',
            thumbnails,
            channelTitle: 'channelTitle1',
            liveBroadcastContent: 'upcoming',
            publishTime: '2014-09-27T01:39:18Z',
          },
        },
        {
          kind: 'youtube#searchResult',
          etag: 'erqeM78PZDWIBe8qOGHGM2WdSE8',
          id: {
            kind: 'youtube#video',
            videoId: 'videoId1',
          },
          snippet: {
            publishedAt: '2019-09-30T23:54:32Z',
            channelId: 'UCPGzT4wecuWM0BH9mPiulXg',
            title: 'title2',
            description: 'description2',
            thumbnails,
            channelTitle: 'Wizeline',
            liveBroadcastContent: 'none',
            publishTime: '2019-09-30T23:54:32Z',
          },
        },
      ];

      useVideos.mockReturnValueOnce({ videoList: returnedArray, isLoading: false });

      const { getByText } = render(
        <BrowserRouter>
          <DarkProvider>
            <ThemesProvider>
              <RelatedVideos relatedToVideoId={relatedToVideoId} />
            </ThemesProvider>
          </DarkProvider>
        </BrowserRouter>
      );

      expect(useVideos).toBeCalledWith(relatedToVideoId, REQ_TYPE);
      expect(getByText(/title2/i)).toBeInTheDocument();
    });
  });
});
