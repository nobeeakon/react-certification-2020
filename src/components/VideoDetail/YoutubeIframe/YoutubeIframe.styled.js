import styled from 'styled-components';

export const OuterWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;

  padding-bottom: ${(props) => (1 / props.ratio) * 100}%;
`;
export const InnerWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const ResponsiveIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;
