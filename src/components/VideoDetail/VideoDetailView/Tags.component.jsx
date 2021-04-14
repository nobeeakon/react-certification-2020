import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { TagContainer, Tag, ExtraTagsButton } from './VideoDetailView.styled';

const Tags = ({ tags }) => {
  const [showExtraTags, setShowExtraTags] = useState(false);

  const MAX_TAGS = 5;
  const toogleShowExtraTags = () => setShowExtraTags((prevState) => !prevState);

  const handleTagClick = (e) => {
    // TODO implement this feature
    console.log(`Tag:  ${e.target.innerText} clicked`);
  };

  return (
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
        <ExtraTagsButton onClick={toogleShowExtraTags} data-testid="toggleShowExtraTags">
          {!showExtraTags ? 'more...' : 'less...'}
        </ExtraTagsButton>
      )}
    </TagContainer>
  );
};

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
};

Tags.defaultProps = {
  tags: [],
};

export default Tags;
