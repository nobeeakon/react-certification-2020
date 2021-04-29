const capitalize = (word) => word.replace(/^\w/, (c) => c.toUpperCase());

export const ROUTES = {
  RESULTS: 'results',
  WATCH: 'watch',
  PRIVATE: 'personal',
};

export const PRIVATE_ROUTES = {
  LIBRARY: 'libary',
  PRIVATE_WATCH: `private${capitalize(ROUTES.WATCH)}`,
};

// build URL for results
export const queryResultsUrl = (searchQuery) =>
  `/${ROUTES.RESULTS}?search_query=${searchQuery}`;

// build URL for Watch route
export const queryWatchUrl = (videoId) => `/${ROUTES.WATCH}?v=${videoId}`;
export const queryPrivateWatchUrl = (videoId) =>
  `/${ROUTES.PRIVATE}/${PRIVATE_ROUTES.PRIVATE_WATCH}?v=${videoId}`;

export const privateLibraryUrl = `/${ROUTES.PRIVATE}/${PRIVATE_ROUTES.LIBRARY}`;
