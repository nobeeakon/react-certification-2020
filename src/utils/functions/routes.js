export const ROUTES = {
  RESULTS: 'results',
  WATCH: 'watch',
  PRIVATE: 'personal', // TODO use this in the ROUTER
  LIBRARY: 'personal/libary',
  PRIVATE_WATCH: 'personal/privateWatch',
};

// build URL for /results
export const queryResultsUrl = (searchQuery) =>
  `/${ROUTES.RESULTS}?search_query=${searchQuery}`;

// build URL for Watch route
export const queryWatchUrl = (videoId) => `/${ROUTES.WATCH}?v=${videoId}`;
export const queryPrivateWatchUrl = (videoId) => `/${ROUTES.PRIVATE_WATCH}?v=${videoId}`;
