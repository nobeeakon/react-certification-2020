import React from 'react';

import { Redirect } from 'react-router-dom';

import { useGlobalContext } from '../../providers/Global/Global.provider';

import VideoList from '../../components/VideoList/VideoList';

const Results = () => {
  const { globalState } = useGlobalContext();
  const { searchTerm } = globalState;

  if (!searchTerm) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <VideoList searchString={searchTerm} />
    </div>
  );
};

export default Results;
