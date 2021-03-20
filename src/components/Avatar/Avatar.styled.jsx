import styled from 'styled-components';

const StyledAvatarImg = styled.img`
  border-radius: 50%;
  height: 32px;
  width: 32px;

  &:hover {
  }
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
`;

export { StyledAvatarImg, AvatarContainer };
