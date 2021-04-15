import React, { useState } from 'react';
import PropTypes from 'prop-types';

import he from 'he';

import { DescriptionItem, ExtraDescriptionButton } from './VideoDetailView.styled';

const Description = ({ description }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const descriptionFull = he.decode(description);
  const DESCRIPTION_LENGTH = 200;

  const toogleShowFullDescription = () =>
    setShowFullDescription((prevState) => !prevState);

  const shortDescription =
    descriptionFull.length > DESCRIPTION_LENGTH
      ? `${descriptionFull.slice(0, 100)}...`
      : descriptionFull;

  return (
    <DescriptionItem>
      {showFullDescription ? descriptionFull : shortDescription}
      {descriptionFull.length > DESCRIPTION_LENGTH && (
        <ExtraDescriptionButton
          onClick={toogleShowFullDescription}
          data-testid="toogleShowFullDescription"
        >
          {!showFullDescription ? 'more...' : 'less..'}
        </ExtraDescriptionButton>
      )}
    </DescriptionItem>
  );
};

Description.propTypes = {
  description: PropTypes.string,
};

Description.defaultProps = {
  description: '',
};

export default Description;
