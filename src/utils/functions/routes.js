export const ROUTES = {
  RESULTS: 'results',
  WATCH: 'watch',
};

// build URL for /results
export const queryResultsUrl = (searchQuery) =>
  `/${ROUTES.RESULTS}?search_query=${searchQuery}`;

// build URL for Watch route
export const queryWatchUrl = (videoId) => `/${ROUTES.WATCH}?v=${videoId}`;
