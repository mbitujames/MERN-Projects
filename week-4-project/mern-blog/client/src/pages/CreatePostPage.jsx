import { Container, Typography } from '@mui/material';
import PostForm from '../components/PostForm';
import { useAuth } from '../hooks/useAuth';

const CreatePostPage = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Container>
        <Typography variant="h6">Please login to create posts</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Create New Post</Typography>
      <PostForm />
    </Container>
  );
};

export default CreatePostPage;