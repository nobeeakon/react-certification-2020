import styled from 'styled-components';

import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  color: ${(props) => props.theme.contrast2};

  &:hover {
    color: ${(props) => props.theme.warning1};
  }
`;

export default StyledLink;
