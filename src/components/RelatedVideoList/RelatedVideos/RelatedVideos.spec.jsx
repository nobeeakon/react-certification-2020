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

    it('should display video Cards when array is returned', async () => {
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
            title: 'Wizeline title1',
            description:
              "Wizeline transforms how teams build technology. Its customers accelerate the delivery of innovative products with proven solutions, which combine Wizeline's ...",
            thumbnails: {
              default: {
                url:
                  'https://yt3.ggpht.com/ytc/AAUvwnighSReQlmHl_S_vSfvnWBAG5Cw4A0YxtE0tm5OpQ=s88-c-k-c0xffffffff-no-rj-mo',
              },
              medium: {
                url:
                  'https://yt3.ggpht.com/ytc/AAUvwnighSReQlmHl_S_vSfvnWBAG5Cw4A0YxtE0tm5OpQ=s240-c-k-c0xffffffff-no-rj-mo',
              },
              high: {
                url:
                  'https://yt3.ggpht.com/ytc/AAUvwnighSReQlmHl_S_vSfvnWBAG5Cw4A0YxtE0tm5OpQ=s800-c-k-c0xffffffff-no-rj-mo',
              },
            },
            channelTitle: 'Wizeline',
            liveBroadcastContent: 'upcoming',
            publishTime: '2014-09-27T01:39:18Z',
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
            title: 'Video Tour | Welcome to Wizeline Guadalajara',
            description:
              'Follow Hector Padilla, Wizeline Director of Engineering, for a lively tour of our office. In 2018, Wizeline opened its stunning new office in Guadalajara, Jalisco, ...',
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
      expect(getByText(/Wizeline title1/i)).toBeInTheDocument();
      expect(getByText(/Video Tour | Welcome /i)).toBeInTheDocument();
    });
  });
});
