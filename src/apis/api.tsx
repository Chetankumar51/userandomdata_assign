import axios from 'axios';


export const getUser = async () => {
  const response = await axios.get("https://randomuser.me/api");
  return response.data.results[0];
};