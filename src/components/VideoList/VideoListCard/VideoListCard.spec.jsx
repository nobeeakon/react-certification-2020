import React from 'react';

import VideoListCard from './VideoListCard.component';

import customRenderGlobalProviders from '../../../utils/tests/customRenders/customRenderGlobalProviders';

describe('Testing VideoCard.component', () => {
  describe('VideoCard renders when missing props', () => {
    test('renders when props.title is null', () => {
      const video = {};
      const { container } = customRenderGlobalProviders(
        <VideoListCard
          videoId="videoId"
          thumbUrl="image"
          title={video.title}
          author="author"
          description="description"
        />
      );

      expect(container).toHaveTextContent(/description/i);
    });

    test('renders when props.author is null', () => {
      const video = {};
      const { container } = customRenderGlobalProviders(
        <VideoListCard
          videoId="videoId"
          thumbUrl="image"
          title="title"
          author={video.author}
          description="description"
        />
      );

      expect(container).toHaveTextContent(/description/i);
    });

    test('renders when props.description is null', () => {
      const video = {};
      const { container } = customRenderGlobalProviders(
        <VideoListCard
          videoId="videoId"
          thumbUrl="image"
          title="title"
          author="author"
          description={video.description}
        />
      );

      expect(container).toHaveTextContent(/author/i);
    });
  });

  // since sometimes API returns coded strings
  describe('VideoCard shown texts are decoded', () => {
    const codedString = 'Wizeline&#39;s';
    test('title gets decoded', () => {
      const { container } = customRenderGlobalProviders(
        <VideoListCard
          videoId="videoId"
          thumbUrl="image"
          title={codedString}
          author="author"
          description="description"
        />
      );

      expect(container).toHaveTextContent(/Wizeline's/i);
    });

    test('author gets decoded', () => {
      const { container } = customRenderGlobalProviders(
        <VideoListCard
          videoId="videoId"
          thumbUrl="image"
          title="title"
          author={codedString}
          description="description"
        />
      );

      expect(container).toHaveTextContent(/Wizeline's/i);
    });

    test('description gets decoded', () => {
      const { container } = customRenderGlobalProviders(
        <VideoListCard
          videoId="videoId"
          thumbUrl="image"
          title="title"
          author="author"
          description={codedString}
        />
      );

      expect(container).toHaveTextContent(/Wizeline's/i);
    });
  });

  // TODO: test onclick ?
});
