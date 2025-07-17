import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Alert } from '@mui/material';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      <form onSubmit={handleSubmit}>
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
        <Button type="submit" variant="contained" sx={{ mt: 3 }}>
          Login
        </Button>
      </form>
      <Typography sx={{ mt: 2 }}>
        Don't have an account? <Link to="/register">Register here</Link>
      </Typography>
    </Container>
  );
};

export default LoginPage;