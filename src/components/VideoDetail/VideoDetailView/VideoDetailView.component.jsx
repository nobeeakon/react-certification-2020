import React, { useState } from 'react';
import PropTypes from 'prop-types';

import he from 'he';

import { BiDislike, BiLike } from 'react-icons/bi';

import YouTubeIframe from '../YoutubeIframe/YoutubeIframe.component';

import {
  MainInfoContainer,
  YoutubeIframeContainer,
  Title,
  StatsContainer,
  StatElement,
  InfoContainer,
  ChannelTitle,
  Description,
  ExtraDescriptionButton,
  TagContainer,
  Tag,
  ExtraTagsButton,
} from './VideoDetailView.styled';

const VideoDetailView = ({
  videoId,
  channelTitle,
  title,
  description,
  views,
  likes,
  dislikes,
  tags,
}) => {
  const [showExtraTags, setShowExtraTags] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const titleFull = he.decode(title);
  const channelTitleFull = he.decode(channelTitle);
  const descriptionFull = he.decode(description);

  const MAX_TAGS = 5;
  const DESCRIPTION_LENGTH = 200;

  const shortDescription =
    descriptionFull.length > DESCRIPTION_LENGTH
      ? `${descriptionFull.slice(0, 100)}...`
      : descriptionFull;

  const toogleShowExtraTags = () => setShowExtraTags((prevState) => !prevState);
  const toogleShowFullDescription = () =>
    setShowFullDescription((prevState) => !prevState);

  const handleTagClick = (e) => {
    // TODO implement this feature
    console.log(`Tag:  ${e.target.innerText} clicked`);
  };

  return (
    <div>
      <YoutubeIframeContainer>
        <YouTubeIframe videoId={videoId} />
      </YoutubeIframeContainer>
      <MainInfoContainer>
        <Title>{titleFull}</Title>
        <StatsContainer>
          <StatElement>{views} Views</StatElement>
          <StatElement>
            <BiLike />
            {likes}
          </StatElement>
          <StatElement>
            <BiDislike />
            {dislikes}
          </StatElement>
        </StatsContainer>
      </MainInfoContainer>
      <InfoContainer>
        <ChannelTitle>{channelTitleFull}</ChannelTitle>
        {tags.length > 0 && (
          <TagContainer>
            {!showExtraTags
              ? tags.slice(0, MAX_TAGS).map((tag) => (
                  <Tag key={tag.replace(/\s/g, '_')} onClick={handleTagClick}>
                    {tag}
                  </Tag>
                ))
              : tags.map((tag) => (
                  <Tag key={tag.replace(/\s/g, '_')} onClick={handleTagClick}>
                    {tag}
                  </Tag>
                ))}
            {tags.length > MAX_TAGS && (
              <ExtraTagsButton
                onClick={toogleShowExtraTags}
                data-testid="toggleShowExtraTags"
              >
                {!showExtraTags ? 'more...' : 'less...'}
              </ExtraTagsButton>
            )}
          </TagContainer>
        )}
        <Description>
          {showFullDescription ? descriptionFull : shortDescription}
          {descriptionFull.length > DESCRIPTION_LENGTH && (
            <ExtraDescriptionButton
              onClick={toogleShowFullDescription}
              data-testid="toogleShowFullDescription"
            >
              {!showFullDescription ? 'more...' : 'less..'}
            </ExtraDescriptionButton>
          )}
        </Description>
      </InfoContainer>
    </div>
  );
};

VideoDetailView.propTypes = {
  videoId: PropTypes.string.isRequired,
  channelTitle: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  views: PropTypes.string,
  dislikes: PropTypes.string,
  likes: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
};

VideoDetailView.defaultProps = {
  channelTitle: '',
  title: '',
  description: '',
  views: '0',
  dislikes: '0',
  likes: '0',
  tags: [],
};

export default VideoDetailView;
