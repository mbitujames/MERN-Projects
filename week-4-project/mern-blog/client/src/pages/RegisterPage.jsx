import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Alert 
} from '@mui/material';
import { useAuth } from '../hooks/useAuth';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ name, email, password });
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Register</Typography>
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          required
        />
        <Button 
          type="submit" 
          variant="contained" 
          sx={{ mt: 3 }}
          fullWidth
        >
          Register
        </Button>
      </form>
      <Typography sx={{ mt: 2, textAlign: 'center' }}>
        Already have an account? <Link to="/login">Login here</Link>
      </Typography>
    </Container>
  );
};

export default RegisterPage;