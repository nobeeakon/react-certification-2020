import axios from 'axios';

const fetchData = async (API_URL) => {
  const response = await axios.get(API_URL);
  return response.data.items;
};

export default fetchData;
