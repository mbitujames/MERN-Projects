import axios from 'axios';

export const fetchPosts = async (page = 1) => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`
  );
  return response.data;
};