import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert
} from '@mui/material';
import { LanguageContext } from '../contexts/LanguageContext';
import api from '../api/axiosConfig';

export default function LoginPage() {
  const { lang } = useContext(LanguageContext);
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]     = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(
        `https://arihanttradingco.onrender.com/api/auth/login`,
        { email, password }
      );
      localStorage.setItem('token', res.data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ pt: 12 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontFamily: 'Baloo Bhaijaan 2' }}
      >
        {lang === 'en' ? 'Admin Login' : 'प्रशासक लॉगिन'}
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
        <TextField
          label={lang === 'en' ? 'Email' : 'ईमेल'}
          type="email"
          required
          fullWidth
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          label={lang === 'en' ? 'Password' : 'पासवर्ड'}
          type="password"
          required
          fullWidth
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button variant="contained" type="submit">
          {lang === 'en' ? 'Log In' : 'लॉग इन'}
        </Button>
      </Box>
    </Container>
  );
}