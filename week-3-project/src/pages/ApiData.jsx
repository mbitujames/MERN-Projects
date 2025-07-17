import { useState } from 'react';
import { usePosts } from '../hooks/usePosts';
import { filterPosts } from '../utils/search';
import Card from '../components/Card';
import Button from '../components/Button';

const ApiData = () => {
  const { posts, loading, error, page, setPage } = usePosts();
  const [searchTerm, setSearchTerm] = useState('');
  const filteredPosts = filterPosts(posts, searchTerm);

  return (
    <Card className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">API Data</h1>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      {loading && <p className="text-center py-4">Loading...</p>}
      {error && <p className="text-red-500 text-center py-4">{error}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {filteredPosts.map(post => (
          <Card key={post.id} className="p-4">
            <h3 className="font-bold text-lg mb-2">{post.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{post.body}</p>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-between">
        <Button 
          onClick={() => setPage(p => Math.max(1, p - 1))} 
          disabled={page === 1}
        >
          Previous
        </Button>
        <span className="self-center">Page {page}</span>
        <Button onClick={() => setPage(p => p + 1)}>
          Next
        </Button>
      </div>
    </Card>
  );
};

export default ApiData;