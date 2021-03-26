import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const StyledLink = styled(Link)(
  ({ theme }) => `
  color: ${theme.contrast2};

  &:hover {
    color: ${theme.warning1};
  }
`
);

StyledLink.propTypes = {
  theme: PropTypes.shape({
    contrast2: PropTypes.string,
    warning1: PropTypes.string.isRequired,
  }),
};

export default StyledLink;
