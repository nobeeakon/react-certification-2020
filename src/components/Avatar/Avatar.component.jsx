import React from 'react';

import { StyledAvatarImg, AvatarContainer } from './Avatar.styled';

const tmpSrc =
  'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.KlnaM8eoWZhWkHGTHhb4xQAAAA%26pid%3DApi&f=1';

const AvatarImg = () => (
  <AvatarContainer>
    <StyledAvatarImg src={tmpSrc} />
  </AvatarContainer>
);
export default AvatarImg;
