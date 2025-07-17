import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  CircularProgress, 
  Alert, 
  Box, 
  Button, 
  TextField,
  Divider
} from '@mui/material';
import { postService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const PostPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const postData = await postService.getPost(id);
        setPost(postData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    if (!comment.trim()) {
      setCommentError('Comment cannot be empty');
      return;
    }

    try {
      const updatedPost = await postService.addComment(post._id, { content: comment });
      setPost(updatedPost);
      setComment('');
      setCommentError('');
    } catch (err) {
      setCommentError(err.message);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!post) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning">Post not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        {post.title}
      </Typography>
      
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Posted by {post.author?.name} in {post.category?.name} • {new Date(post.createdAt).toLocaleDateString()}
      </Typography>
      
      <Typography variant="body1" paragraph sx={{ mt: 3, whiteSpace: 'pre-line' }}>
        {post.content}
      </Typography>
      
      <Divider sx={{ my: 4 }} />
      
      <Typography variant="h5" gutterBottom>
        Comments ({post.comments.length})
      </Typography>
      
      {user && (
        <Box component="form" onSubmit={handleCommentSubmit} sx={{ mb: 4 }}>
          <TextField
            fullWidth
            multiline
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            label="Add a comment"
            variant="outlined"
            error={!!commentError}
            helperText={commentError}
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Post Comment
          </Button>
        </Box>
      )}
      
      {post.comments.map((comment) => (
        <Box key={comment._id} sx={{ mb: 3, p: 2, border: '1px solid #eee', borderRadius: 1 }}>
          <Typography variant="subtitle2" gutterBottom>
            {comment.user?.name || 'Anonymous'} • {new Date(comment.createdAt).toLocaleDateString()}
          </Typography>
          <Typography variant="body1">{comment.content}</Typography>
        </Box>
      ))}
    </Container>
  );
};

export default PostPage;