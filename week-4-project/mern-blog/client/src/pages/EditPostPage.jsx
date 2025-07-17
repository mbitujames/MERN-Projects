import { useParams } from 'react-router-dom';
import { Container, Typography, CircularProgress } from '@mui/material';
import PostForm from '../components/PostForm';
import { useGetPost } from '../hooks/usePosts';

const EditPostPage = () => {
  const { id } = useParams();
  const { data: post, isLoading } = useGetPost(id);

  if (isLoading) return <CircularProgress />;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Edit Post</Typography>
      <PostForm post={post} />
    </Container>
  );
};

export default EditPostPage;