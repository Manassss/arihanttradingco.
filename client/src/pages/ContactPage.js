import React, { useContext } from 'react';
import { Container, Box, Typography } from '@mui/material';
import { LanguageContext } from '../contexts/LanguageContext';

export default function ContactPage() {
  const { lang } = useContext(LanguageContext);

  return (
    <Box sx={{ pt: 12, minHeight: '100vh', backgroundColor: '#f7f4ef', px: { xs: 2, md: 4 } }}>
      <Container maxWidth="sm">
        <Typography variant="h3" gutterBottom sx={{ textAlign: 'center', fontFamily: 'Baloo Bhaijaan 2', fontSize: '3.5rem' }}>
          {lang === 'en' ? 'Contact Us' : 'संपर्क'}
        </Typography>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '2.25rem' }}>
            {lang === 'en' ? 'Reach us directly at:' : 'कृपया खालील तपशील वापरा:'}
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: '2.1rem' }}>
            {lang === 'en'
              ? '📧 arihanttradingcom11@gmail.com'
              : '📧 arihanttradingcom11@gmail.com'}
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: '2.1rem' }}>
            {lang === 'en'
              ? '📞 +91-9730206830'
              : '📞 +९१-९७३०२०६८३०'}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '2.1rem' }}>
            {lang === 'en'
              ? '🏢 Arihant Trading Company, Next to Matoshree Weighing Bridge, Ahilyanagar - Jamkhed Road, Chichondi Patil - 414201'
              : '🏢 अरिहंत ट्रेडिंग कंपनी, माथोश्री वजन काटा च्या पुढे , अहिल्यानगर - जमखेड मार्ग, चिचोंडी पाटील - 414201'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}