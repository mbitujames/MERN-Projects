import { Card, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>{post.title}</Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {post.excerpt || post.content.substring(0, 100)}...
        </Typography>
        <Button 
          component={Link} 
          to={`/posts/${post._id}`}
          size="small"
        >
          Read More
        </Button>
      </CardContent>
    </Card>
  );
};

export default PostCard;