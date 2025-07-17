import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert
} from '@mui/material';
import { useCategories } from '../hooks/useCategories';
import { useAuth } from '../hooks/useAuth';
import { postService } from '../services/api';

const PostForm = ({ post }) => {
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [category, setCategory] = useState(post?.category?._id || '');
  const [error, setError] = useState('');
  const { data: categories } = useCategories();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = { title, content, category, author: user.id };
      
      if (post) {
        await postService.updatePost(post._id, postData);
      } else {
        await postService.createPost(postData);
      }
      
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Content"
        multiline
        rows={6}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        margin="normal"
        required
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          label="Category"
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          {categories?.map((cat) => (
            <MenuItem key={cat._id} value={cat._id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" sx={{ mt: 3 }}>
        {post ? 'Update Post' : 'Create Post'}
      </Button>
    </form>
  );
};

export default PostForm;