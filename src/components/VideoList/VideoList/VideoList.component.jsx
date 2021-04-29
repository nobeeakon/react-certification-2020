import React from 'react';
import PropTypes from 'prop-types';

import * as Styled from './VideoList.styled';

import useVideos from '../../../utils/hooks/useVideos';

import { REQUEST_API_TYPES } from '../../../utils/constants';

import CardListPresenter from './VideoList.presenter';
import useIsMountedRef from '../../../utils/hooks/useIsMountedRef';

const REQ_TYPE = REQUEST_API_TYPES.SEARCH_BY_TERM;

const CardList = ({ searchString }) => {
  const isMountedRef = useIsMountedRef();
  const { videoList, isLoading, error } = useVideos(searchString, REQ_TYPE, isMountedRef);

  if (isLoading) return <Styled.Message>Loading...</Styled.Message>;
  if (error) return <Styled.Message>Somethig went wrong :( </Styled.Message>;

  return <CardListPresenter videoList={videoList} />;
};

CardList.propTypes = {
  searchString: PropTypes.string,
};

CardList.defaultProps = {
  searchString: 'Wizeline',
};

export default CardList;
