import { useState, useEffect } from 'react';
import { fetchPosts } from '../api/posts';

export const usePosts = (initialPage = 1) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const data = await fetchPosts(page);
        setPosts(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [page]);

  return { posts, loading, error, page, setPage };
};