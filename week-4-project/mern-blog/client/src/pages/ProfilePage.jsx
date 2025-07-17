import { Container, Typography, Button } from '@mui/material';
import { useAuth } from '../hooks/useAuth';

const ProfilePage = () => {
  const { user, logout } = useAuth();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Your Profile</Typography>
      <Typography variant="body1">Name: {user?.name}</Typography>
      <Typography variant="body1">Email: {user?.email}</Typography>
      <Button 
        variant="contained" 
        color="error" 
        sx={{ mt: 3 }}
        onClick={logout}
      >
        Logout
      </Button>
    </Container>
  );
};

export default ProfilePage;