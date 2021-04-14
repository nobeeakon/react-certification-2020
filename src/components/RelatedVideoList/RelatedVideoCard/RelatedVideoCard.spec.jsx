import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import RelatedVideoCard from './RelatedVideoCard.component';
import ThemeProvider from '../../../providers/Theme';
import DarkModeProvider from '../../../providers/DarkMode';

describe('Testing RelatedVideoCard component', () => {
  describe('RelatedVideoCard renders when missing props', () => {
    describe('When isAvailable = true', () => {
      it('renders when props.title is undefined', () => {
        const video = {};
        const { getByText } = render(
          <BrowserRouter>
            <DarkModeProvider>
              <ThemeProvider>
                <RelatedVideoCard
                  title={video.title}
                  channelTitle="channel Title"
                  thumbUrl="image"
                  isAvailable
                  videoId="videoId"
                />
              </ThemeProvider>
            </DarkModeProvider>
          </BrowserRouter>
        );
        expect(getByText(/channel title/i)).toBeInTheDocument();
      });

      it('renders when props.channelTitle is undefined ', () => {
        const video = {};
        const { getByText } = render(
          <BrowserRouter>
            <DarkModeProvider>
              <ThemeProvider>
                <RelatedVideoCard
                  title="title"
                  channelTitle={video.channelTitle}
                  thumbUrl="image"
                  isAvailable
                  videoId="videoId"
                />
              </ThemeProvider>
            </DarkModeProvider>
          </BrowserRouter>
        );
        expect(getByText(/title/i)).toBeInTheDocument();
      });
    });
  });

  describe('When isAvailable = false', () => {
    it('renders "Not available" instead of title', () => {
      const { getByText } = render(
        <BrowserRouter>
          <DarkModeProvider>
            <ThemeProvider>
              <RelatedVideoCard
                title="title"
                channelTitle="channelTitle"
                thumbUrl="image"
                isAvailable={false}
                videoId="videoId"
              />
            </ThemeProvider>
          </DarkModeProvider>
        </BrowserRouter>
      );
      expect(getByText(/Not available/i)).toBeInTheDocument();
    });

    it('renders "Not available" when only required props (videoId) are passed', () => {
      const { getByText } = render(
        <BrowserRouter>
          <DarkModeProvider>
            <ThemeProvider>
              <RelatedVideoCard videoId="videoId" />
            </ThemeProvider>
          </DarkModeProvider>
        </BrowserRouter>
      );
      expect(getByText(/Not available/i)).toBeInTheDocument();
    });
  });

  // since sometimes API returns coded strings
  describe('RelatedVideoCard shown texts are decoded', () => {
    const codedString = 'Wizeline&#39;s';
    test('title gets decoded', () => {
      const { getByText } = render(
        <BrowserRouter>
          <DarkModeProvider>
            <ThemeProvider>
              <RelatedVideoCard
                title={codedString}
                channelTitle="channelTitle"
                thumbUrl="image"
                isAvailable
                videoId="videoId"
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
                title="title"
                channelTitle={codedString}
                thumbUrl="image"
                isAvailable
                videoId="videoId"
              />
            </ThemeProvider>
          </DarkModeProvider>
        </BrowserRouter>
      );
      expect(getByText(/Wizeline's/i)).toBeInTheDocument();
    });
  });
});
