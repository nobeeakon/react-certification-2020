import React from 'react';

import { withRouter } from 'react-router';
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';

import VideoList from '../../components/VideoList/VideoList';

const Results = ({ location }) => {
  const parsedQuery = queryString.parse(location.search);
  const searchQuery = parsedQuery.search_query;

  if (!searchQuery) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <VideoList searchString={searchQuery} />
    </div>
  );
};

export default withRouter(Results);
