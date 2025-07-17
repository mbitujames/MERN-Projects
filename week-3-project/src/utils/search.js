export const filterPosts = (posts, searchTerm) => {
  if (!searchTerm.trim()) return posts;
  
  const term = searchTerm.toLowerCase();
  return posts.filter(post =>
    post.title.toLowerCase().includes(term) ||
    post.body.toLowerCase().includes(term)
  );
};