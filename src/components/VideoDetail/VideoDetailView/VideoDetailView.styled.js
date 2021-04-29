import styled from 'styled-components';

import StyledButton from '../../StyledComponents/StyledButton';

export const MainInfoContainer = styled.div`
  width: 100%;
`;

export const YoutubeIframeContainer = styled.div`
  width: 100%;
`;

export const Title = styled.h3`
  color: ${(props) => props.theme.contrast1};
`;

export const StatsContainer = styled.div`
  color: ${(props) => props.theme.contrast2};
  font-size: small;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const StatElement = styled.span`
  & * {
    padding-right: 5px;
  }
`;

export const TagContainer = styled.div`
  padding: 0 10px;
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  color: ${(props) => props.theme.contrast2};
`;

export const Tag = styled(StyledButton)`
  padding: 0 5px;
  margin: 5px;

  height: 100%;

  color: ${(props) => props.theme.contrast2};
  border: 1px solid ${(props) => props.theme.contrast2};

  border-radius: 10px;
  font-size: small;

  &:hover {
    border-color: ${(props) => props.theme.warning2};
  }
`;

export const ExtraTagsButton = styled(StyledButton)``;

export const InfoContainer = styled.div`
  margin: 10px 0;
  border-top: 1px solid ${(props) => props.theme.contrast2};
  border-bottom: 1px solid ${(props) => props.theme.contrast2};
`;

export const ChannelTitle = styled.h4`
  color: ${(props) => props.theme.contrast1};
`;

export const DescriptionItem = styled.p`
  width: 80%;
  color: ${(props) => props.theme.contrast2};
  padding: 0 20px;
  font-size: small;
`;

export const ExtraDescriptionButton = styled(StyledButton)``;
