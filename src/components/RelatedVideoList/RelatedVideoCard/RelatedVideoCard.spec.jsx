import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import RelatedVideoCard from './RelatedVideoCard.component';
import ThemeProvider from '../../../providers/Theme';
import DarkModeProvider from '../../../providers/DarkMode';

describe('Testing RelatedVideoCard component', () => {
  describe('RelatedVideoCard renders when missing props', () => {
    const mockedGoToVideo = jest.fn(() => {});

    test('renders when props.title is null', () => {
      const video = {};
      const { getByText } = render(
        <BrowserRouter>
          <DarkModeProvider>
            <ThemeProvider>
              <RelatedVideoCard
                title={video.title}
                channelTitle="channel Title"
                goToVideoHandler={mockedGoToVideo}
                thumbUrl="image"
              />
            </ThemeProvider>
          </DarkModeProvider>
        </BrowserRouter>
      );

      expect(getByText(/channel title/i)).toBeInTheDocument();
    });

    test('renders when props.author is null', () => {
      const video = {};
      const { getByText } = render(
        <BrowserRouter>
          <DarkModeProvider>
            <ThemeProvider>
              <RelatedVideoCard
                goToVideoHandler={mockedGoToVideo}
                thumbUrl="image"
                title="title"
                channelTitle={video.author}
              />
            </ThemeProvider>
          </DarkModeProvider>
        </BrowserRouter>
      );
      expect(getByText(/title/i)).toBeInTheDocument();
    });
  });

  // since sometimes API returns coded strings
  describe('RelatedVideoCard shown texts are decoded', () => {
    const mockedGoToVideo = jest.fn(() => {});

    const codedString = 'Wizeline&#39;s';
    test('title gets decoded', () => {
      const { getByText } = render(
        <BrowserRouter>
          <DarkModeProvider>
            <ThemeProvider>
              <RelatedVideoCard
                goToVideoHandler={mockedGoToVideo}
                thumbUrl="image"
                title={codedString}
                channelTitle="author"
              />
            </ThemeProvider>
          </DarkModeProvider>
        </BrowserRouter>
      );
      expect(getByText(/Wizeline's/i)).toBeInTheDocument();
    });

    test('channelTitle gets decoded', () => {
      const { getByText } = render(
        <BrowserRouter>
          <DarkModeProvider>
            <ThemeProvider>
              <RelatedVideoCard
                goToVideoHandler={mockedGoToVideo}
                thumbUrl="image"
                title="title"
                channelTitle={codedString}
              />
            </ThemeProvider>
          </DarkModeProvider>
        </BrowserRouter>
      );
      expect(getByText(/Wizeline's/i)).toBeInTheDocument();
    });
  });

  describe('Testing  onClick handler', () => {
    const mockedGoToVideo = jest.fn(() => {});

    it('calls goToVideoHandler when VideoCard is clicked', () => {
      const { getByText } = render(
        <BrowserRouter>
          <DarkModeProvider>
            <ThemeProvider>
              <RelatedVideoCard
                goToVideoHandler={mockedGoToVideo}
                thumbUrl="image"
                title="video title"
                channelTitle="author"
              />
            </ThemeProvider>
          </DarkModeProvider>
        </BrowserRouter>
      );

      const videoCard = getByText(/title/i);
      fireEvent.click(videoCard);
      expect(mockedGoToVideo).toHaveBeenCalledTimes(1);
    });
  });
});
