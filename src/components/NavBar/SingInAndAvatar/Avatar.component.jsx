import React, { useState, useRef, useEffect } from 'react';

import PrivateModal from '../Private/PrivateModal/Private.modal';

import * as Styled from '../NavBar.styled';

import { useGlobalContext } from '../../../providers/Global/Global.provider';

const SignInOrAvatar = () => {
  const [isPrivateModalOpen, setIsPrivateModalOpen] = useState(false);

  const { globalState } = useGlobalContext();
  const avatarRef = useRef();
  const modalRef = useRef();

  const { userInfo } = globalState;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (avatarRef?.current?.contains(event.target)) {
        setIsPrivateModalOpen((prev) => !prev);
      } else if (isPrivateModalOpen && !modalRef?.current?.contains(event.target)) {
        setIsPrivateModalOpen(false);
      }
    };
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [avatarRef, setIsPrivateModalOpen, isPrivateModalOpen]);

  return (
    <>
      <Styled.AvatarContainer>
        <Styled.StyledAvatarImg ref={avatarRef} src={userInfo.avatarUrl} />
      </Styled.AvatarContainer>

      <PrivateModal ref={modalRef} isModalOpen={isPrivateModalOpen} />
    </>
  );
};

export default SignInOrAvatar;
