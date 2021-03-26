const fetchData = async (API_URL) => {
  const response = await fetch(API_URL);
  const data = await response.json();

  return data.items;
};

export default fetchData;
