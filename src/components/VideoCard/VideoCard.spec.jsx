import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import VideoCard from './VideoCard.component';
import ThemeProvider from '../../providers/Theme';
import DarkModeProvider from '../../providers/DarkMode';

describe('Testing VideoCard.component', () => {
  describe('VideoCard renders when missing props', () => {
    const mockedGoToVideo = jest.fn(() => {});

    test('renders when props.title is null', () => {
      const video = {};
      const { container } = render(
        <BrowserRouter>
          <DarkModeProvider>
            <ThemeProvider>
              <VideoCard
                goToVideoHandler={mockedGoToVideo}
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
              <VideoCard
                goToVideoHandler={mockedGoToVideo}
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
              <VideoCard
                goToVideoHandler={mockedGoToVideo}
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
    const mockedGoToVideo = jest.fn(() => {});

    const codedString = 'Wizeline&#39;s';
    test('title gets decoded', () => {
      const { container } = render(
        <BrowserRouter>
          <DarkModeProvider>
            <ThemeProvider>
              <VideoCard
                goToVideoHandler={mockedGoToVideo}
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
              <VideoCard
                goToVideoHandler={mockedGoToVideo}
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
              <VideoCard
                goToVideoHandler={mockedGoToVideo}
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

  describe('Testing VideoCard onClick handler', () => {
    const mockedGoToVideo = jest.fn(() => {});

    it('calls goToVideoHandler when VideoCard is clicked', () => {
      const { getByText } = render(
        <BrowserRouter>
          <DarkModeProvider>
            <ThemeProvider>
              <VideoCard
                goToVideoHandler={mockedGoToVideo}
                thumbUrl="image"
                title="video title"
                author="author"
                description="description"
              />
            </ThemeProvider>
          </DarkModeProvider>
        </BrowserRouter>
      );

      const videoCard = getByText(/author/i);
      fireEvent.click(videoCard);
      expect(mockedGoToVideo).toHaveBeenCalledTimes(1);
    });
  });
});
