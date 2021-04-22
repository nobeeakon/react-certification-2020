import React from 'react';
import PropTypes from 'prop-types';

import { NoVideoFound } from './VideoList.styled';

import useVideos from '../../../utils/hooks/useVideos';

import { REQUEST_API_TYPES } from '../../../utils/constants';

import CardListPresenter from './VideoList.presenter';

const CardList = ({ searchString }) => {
  const REQ_TYPE = REQUEST_API_TYPES.SEARCH_BY_TERM;
  const { videoList, isLoading } = useVideos(searchString, REQ_TYPE);

  if (isLoading) return <NoVideoFound>Loading...</NoVideoFound>;
  if (!videoList) return null; // TODO change this to error

  return <CardListPresenter videoList={videoList} />;
};

CardList.propTypes = {
  searchString: PropTypes.string,
};

CardList.defaultProps = {
  searchString: 'Wizeline',
};

export default CardList;
