import React, { forwardRef } from 'react';
import ReactDom from 'react-dom';

import PrivateComponent from '../PrivateComponent/Private.component';

import * as Styled from './Private.modal.styled';

const PrivateModal = (props, ref) => {
  const { isModalOpen } = props;

  if (!isModalOpen) return null;

  return ReactDom.createPortal(
    <>
      <Styled.ModalContainer ref={ref}>
        <PrivateComponent />
      </Styled.ModalContainer>
    </>,
    document.getElementById('portal')
  );
};

export default forwardRef(PrivateModal);
