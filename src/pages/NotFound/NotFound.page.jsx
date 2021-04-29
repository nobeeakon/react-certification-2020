import React, { useState } from 'react';

// import { RiEmotionSadFill } from 'react-icons/ri';

import * as Styled from './NotFound.styled';

function NotFoundPage() {
  const [isMouseOver, setIsMouseOver] = useState(false);

  const handleEnter = () => {
    setIsMouseOver(true);
  };

  const handleExit = () => {
    setIsMouseOver(false);
  };

  const Icon = isMouseOver ? <Styled.Icon1 /> : <Styled.Icon2 />;

  return (
    <Styled.IconContainer onMouseEnter={handleEnter} onMouseLeave={handleExit}>
      {Icon}
      <Styled.Legend>404, page not found !</Styled.Legend>
    </Styled.IconContainer>
  );
}

export default NotFoundPage;
