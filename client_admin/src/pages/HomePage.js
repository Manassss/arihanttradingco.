import { useEffect, useState, useContext } from 'react';
import axios from '../api/axiosConfig';
import GrainCard from '../components/GrainCard';
import { LanguageContext } from '../contexts/LanguageContext';
import { Container, Grid, CircularProgress, Alert, Box } from '@mui/material';
import Navbar from '../components/navbar';

export default function HomePage() {
  const { lang, setLang } = useContext(LanguageContext);
  const [grains, setGrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios.get(`${process.env.REACT_APP_API_URL}/grains`) 
      .then(res => {
        setGrains(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Failed to fetch grains');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }
  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <>  
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #f7f4ef, #e6ddd1)',
    }}>    
        <Container>
          <Grid container spacing={15} justifyContent="center" alignItems="flex-start">
            {[...grains]
              .sort((a, b) => a.name[lang].localeCompare(b.name[lang]))
              .map(g => (
                <Grid item xs={6} key={g._id}>
                  <GrainCard grain={g} lang={lang} />
                </Grid>
              ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}