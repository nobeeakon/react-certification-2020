import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import VideoListCard from './VideoListCard.component';
import ThemeProvider from '../../../providers/Theme';
import DarkModeProvider from '../../../providers/DarkMode';

describe('Testing VideoCard.component', () => {
  describe('VideoCard renders when missing props', () => {
    test('renders when props.title is null', () => {
      const video = {};
      const { container } = render(
        <BrowserRouter>
          <DarkModeProvider>
            <ThemeProvider>
              <VideoListCard
                videoId="videoId"
                thumbUrl="image"
                title={video.title}
                author="author"
                description="description"
              />
            </ThemeProvider>
          </DarkModeProvider>
        </BrowserRouter>
      );

      expect(container).toHaveTextContent(/description/i);
    });

    test('renders when props.author is null', () => {
      const video = {};
      const { container } = render(
        <BrowserRouter>
          <DarkModeProvider>
            <ThemeProvider>
              <VideoListCard
                videoId="videoId"
                thumbUrl="image"
                title="title"
                author={video.author}
                description="description"
              />
            </ThemeProvider>
          </DarkModeProvider>
        </BrowserRouter>
      );

      expect(container).toHaveTextContent(/description/i);
    });

    test('renders when props.description is null', () => {
      const video = {};
      const { container } = render(
        <BrowserRouter>
          <DarkModeProvider>
            <ThemeProvider>
              <VideoListCard
                videoId="videoId"
                thumbUrl="image"
                title="title"
                author="author"
                description={video.description}
              />
            </ThemeProvider>
          </DarkModeProvider>
        </BrowserRouter>
      );

      expect(container).toHaveTextContent(/author/i);
    });
  });

  // since sometimes API returns coded strings
  describe('VideoCard shown texts are decoded', () => {
    const codedString = 'Wizeline&#39;s';
    test('title gets decoded', () => {
      const { container } = render(
        <BrowserRouter>
          <DarkModeProvider>
            <ThemeProvider>
              <VideoListCard
                videoId="videoId"
                thumbUrl="image"
                title={codedString}
                author="author"
                description="description"
              />
            </ThemeProvider>
          </DarkModeProvider>
        </BrowserRouter>
      );

      expect(container).toHaveTextContent(/Wizeline's/i);
    });

    test('author gets decoded', () => {
      const { container } = render(
        <BrowserRouter>
          <DarkModeProvider>
            <ThemeProvider>
              <VideoListCard
                videoId="videoId"
                thumbUrl="image"
                title="title"
                author={codedString}
                description="description"
              />
            </ThemeProvider>
          </DarkModeProvider>
        </BrowserRouter>
      );

      expect(container).toHaveTextContent(/Wizeline's/i);
    });

    test('description gets decoded', () => {
      const { container } = render(
        <BrowserRouter>
          <DarkModeProvider>
            <ThemeProvider>
              <VideoListCard
                videoId="videoId"
                thumbUrl="image"
                title="title"
                author="author"
                description={codedString}
              />
            </ThemeProvider>
          </DarkModeProvider>
        </BrowserRouter>
      );

      expect(container).toHaveTextContent(/Wizeline's/i);
    });
  });

  // TODO: test onclick ?
});
