import styled from 'styled-components';

import Link from '../../../StyledComponents/StyledLink';
import Button from '../../../StyledComponents/StyledButton';

export const StyledLink = styled(Link)`
  font-size: medium;
  font-weight: normal;
  display: block;
  color: ${(props) => props.theme.contrast1};
  width: 100%;
`;

export const StyledButton = styled(Button)`
  font-size: medium;
  font-weight: normal;
  color: ${(props) => props.theme.contrast1};
  padding: 0;
  display: block;
  width: 100%;
`;

export const MenuContainer = styled.div`
  width: 120px;
  padding: 5px;
`;
