import React from 'react';

import RelatedVideoCard from './RelatedVideoCard.component';

import customRenderGlobalProviders from '../../../utils/tests/customRenders/customRenderGlobalProviders';

describe('Testing RelatedVideoCard component', () => {
  describe('RelatedVideoCard renders when missing props', () => {
    describe('When isAvailable = true', () => {
      it('renders when props.title is undefined', () => {
        const video = {};
        const { getByText } = customRenderGlobalProviders(
          <RelatedVideoCard
            title={video.title}
            channelTitle="channel Title"
            thumbUrl="image"
            isAvailable
            videoId="videoId"
          />
        );
        expect(getByText(/channel title/i)).toBeInTheDocument();
      });

      it('renders when props.channelTitle is undefined ', () => {
        const video = {};
        const { getByText } = customRenderGlobalProviders(
          <RelatedVideoCard
            title="title"
            channelTitle={video.channelTitle}
            thumbUrl="image"
            isAvailable
            videoId="videoId"
          />
        );
        expect(getByText(/title/i)).toBeInTheDocument();
      });
    });
  });

  describe('When isAvailable = false', () => {
    it('renders "Not available" instead of title', () => {
      const { getByText } = customRenderGlobalProviders(
        <RelatedVideoCard
          title="title"
          channelTitle="channelTitle"
          thumbUrl="image"
          isAvailable={false}
          videoId="videoId"
        />
      );
      expect(getByText(/Not available/i)).toBeInTheDocument();
    });

    it('renders "Not available" when only required props (videoId) are passed', () => {
      const { getByText } = customRenderGlobalProviders(
        <RelatedVideoCard videoId="videoId" />
      );
      expect(getByText(/Not available/i)).toBeInTheDocument();
    });
  });

  // since sometimes API returns coded strings
  describe('RelatedVideoCard shown texts are decoded', () => {
    const codedString = 'Wizeline&#39;s';
    test('title gets decoded', () => {
      const { getByText } = customRenderGlobalProviders(
        <RelatedVideoCard
          title={codedString}
          channelTitle="channelTitle"
          thumbUrl="image"
          isAvailable
          videoId="videoId"
        />
      );
      expect(getByText(/Wizeline's/i)).toBeInTheDocument();
    });

    test('channelTitle gets decoded', () => {
      const { getByText } = customRenderGlobalProviders(
        <RelatedVideoCard
          title="title"
          channelTitle={codedString}
          thumbUrl="image"
          isAvailable
          videoId="videoId"
        />
      );
      expect(getByText(/Wizeline's/i)).toBeInTheDocument();
    });
  });
});
