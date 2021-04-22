import React from 'react';
import { fireEvent, act } from '@testing-library/react';

import VideoDetailView from './VideoDetailView.component';

import customRenderGlobalProviders from '../../../utils/tests/customRenders/customRenderGlobalProviders';

describe('testing VideoDetail component', () => {
  const video = {
    channelTitle: 'channel title',
    videoId: 'videoId',
    title: 'video title',
    description: 'description',
    views: '111',
    likes: '222',
    dislikes: '333',
    tags: ['tag1', 'tag2', 'tag3'],
  };

  const videoLongDescriptionAndTags = {
    channelTitle: 'channel title',
    videoId: 'videoId',
    title: 'video title',
    description:
      'Long description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus ad voluptatum quo ratione inventore provident sint saepe? Reiciendis architecto aut magni suscipit natus nam, et temporibus adipisci ea officiis dolore.',
    views: '111',
    likes: '222',
    dislikes: '333',
    tags: [
      'tag1',
      'tag2',
      'tag3',
      'tag4',
      'tag5',
      'tag6',
      'tag7',
      'tag8',
      'tag9',
      'tag10',
      'tag11',
    ],
  };

  describe('Testing redenred props when short description and short tag list', () => {
    test('Render when a short description and short tag list are provided', () => {
      const { getByText, queryByTestId } = customRenderGlobalProviders(
        <VideoDetailView
          videoId={video.videoId}
          channelTitle={video.channelTitle}
          title={video.title}
          description={video.description}
          tags={video.tags}
          views={video.views}
          likes={video.likes}
          dislikes={video.dislikes}
        />
      );

      expect(getByText(video.channelTitle)).toBeInTheDocument();
      expect(getByText(video.title)).toBeInTheDocument();
      expect(getByText(video.description)).toBeInTheDocument();
      expect(getByText(`${video.views} Views`)).toBeInTheDocument();
      expect(getByText(video.likes)).toBeInTheDocument();
      expect(getByText(video.dislikes)).toBeInTheDocument();

      expect(queryByTestId(/toogleShowExtraInfo/i)).not.toBeInTheDocument();
    });
    test('Render when a long description and long tag list are provided', () => {
      const { getByText, getByTestId } = customRenderGlobalProviders(
        <VideoDetailView
          videoId={videoLongDescriptionAndTags.videoId}
          channelTitle={videoLongDescriptionAndTags.channelTitle}
          title={videoLongDescriptionAndTags.title}
          description={videoLongDescriptionAndTags.description}
          tags={videoLongDescriptionAndTags.tags}
          views={videoLongDescriptionAndTags.views}
          likes={videoLongDescriptionAndTags.likes}
          dislikes={videoLongDescriptionAndTags.dislikes}
        />
      );

      expect(getByText(video.channelTitle)).toBeInTheDocument();
      expect(getByText(video.title)).toBeInTheDocument();
      expect(getByText(`${video.views} Views`)).toBeInTheDocument();
      expect(getByText(video.likes.toString())).toBeInTheDocument();
      expect(getByText(video.dislikes.toString())).toBeInTheDocument();

      expect(getByTestId(/toogleShowFullDescription/i)).toBeInTheDocument();
    });
  });

  describe('Testing description  "toogleShowMore" Buttons', () => {
    it('should initially hide full description and show it when "toogleShowFullDescription" is clicked', () => {
      const { getByTestId, getByText, queryByText } = customRenderGlobalProviders(
        <VideoDetailView
          videoId={videoLongDescriptionAndTags.videoId}
          channelTitle={videoLongDescriptionAndTags.channelTitle}
          title={videoLongDescriptionAndTags.title}
          description={videoLongDescriptionAndTags.description}
          tags={videoLongDescriptionAndTags.tags}
          views={videoLongDescriptionAndTags.views}
          likes={videoLongDescriptionAndTags.likes}
          dislikes={videoLongDescriptionAndTags.dislikes}
        />
      );

      const toogleShowFullDescription = getByTestId(/toogleShowFullDescription/i);
      expect(toogleShowFullDescription).toBeInTheDocument();

      expect(
        getByText(videoLongDescriptionAndTags.description.slice(0, 20), { exact: false })
      ).toBeInTheDocument();
      expect(
        queryByText(videoLongDescriptionAndTags.description)
      ).not.toBeInTheDocument();

      act(() => {
        fireEvent.click(toogleShowFullDescription);
      });

      expect(getByText(videoLongDescriptionAndTags.description)).toBeInTheDocument();
    });
  });

  // since sometimes API returns coded strings
  describe('VideoDetail shown texts are decoded', () => {
    const codedString = 'Wizeline&#39;s';

    test('channelTitle gets decoded', () => {
      const { container } = customRenderGlobalProviders(
        <VideoDetailView
          videoId={video.videoId}
          channelTitle={codedString}
          title={video.title}
          description={video.description}
          tags={video.tags}
          views={video.views}
          likes={video.likes}
          dislikes={video.dislikes}
        />
      );

      expect(container).toHaveTextContent(/Wizeline's/i);
    });

    test('title gets decoded', () => {
      const { container } = customRenderGlobalProviders(
        <VideoDetailView
          videoId={video.videoId}
          channelTitle={video.channelTitle}
          title={codedString}
          description={video.description}
          tags={video.tags}
          views={video.views}
          likes={video.likes}
          dislikes={video.dislikes}
        />
      );

      expect(container).toHaveTextContent(/Wizeline's/i);
    });

    test('description gets decoded', () => {
      const { container } = customRenderGlobalProviders(
        <VideoDetailView
          videoId={video.videoId}
          title={video.title}
          channelTitle={video.channelTitle}
          description={codedString}
          tags={video.tags}
          views={video.views}
          likes={video.likes}
          dislikes={video.dislikes}
        />
      );

      expect(container).toHaveTextContent(/Wizeline's/i);
    });
  });
});
