import React, { useContext } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { Avatar, Grid, Divider } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleIcon from '@mui/icons-material/People';
import SpaIcon from '@mui/icons-material/Spa';
import { LanguageContext } from '../contexts/LanguageContext';
import ManojImage from '../assets/Manoj.jpeg';

export default function AboutPage() {
  const { lang } = useContext(LanguageContext);

  return (
    <Box sx={{ pt: 12, minHeight: '100vh', backgroundColor: '#f7f4ef', px: { xs: 2, md: 4 } }}>
      <Container>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 2,
          mb: 4
        }}>
          <Avatar
            alt="Mr. Manoj Mandlecha"
            src={ManojImage}
            sx={{
              width: 120,
              height: 120,
              mb: 2,
              '& img': {
                objectFit: 'cover',
                width: '100%',
                height: '100%',
              },
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: 700, textAlign: 'center' }}>
            {lang === 'en' ? 'Mr. Manoj Mandlecha' : 'श्री मनोज मंडलेचा'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
            {lang === 'en' ? 'Founder & CEO' : 'संस्थापक आणि मुख्य कार्यकारी अधिकारी'}
          </Typography>
        </Box>
        <Typography variant="h3" gutterBottom sx={{ fontFamily: 'Baloo Bhaijaan 2', textAlign: 'center', width: '100%' }}>
          {lang === 'en' ? 'About Us' : 'आमच्याबद्दल'}
        </Typography>

            <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Baloo Bhaijaan 2' }}>
              {lang === 'en' ? 'Welcome to Arihant Trading Co.' : 'अरिहंत ट्रेडिंग कंपनीमध्ये आपले स्वागत आहे'}
            </Typography>
            <Typography variant="body1" paragraph>
              {lang === 'en'
                ? `Founded by Mr. Manoj Mandlecha, Arihant Trading Co. has been serving the community since 1998. 
                   We specialize in sourcing and supplying the finest quality grains, direct from trusted local farms. 
                   Our commitment to freshness, quality, and fair trade has made us the go-to partner for both retailers 
                   and end consumers alike.`
                : `श्री मनोज मंडलेचा यांनी स्थापन केलेली अरिहंत ट्रेडिंग कंपनी 1998 पासून समुदायाला सेवा पुरवत आहे. 
                   आम्ही विश्वासार्ह स्थानिक शेतांमधून थेट सर्वोत्तम दर्जाचे धान्य स्रोत आणि पुरवठा करण्यास माहिर आहोत. 
                   ताजेपणा, गुणवत्ता आणि न्याय्य व्यापारातली आमची बांधिलकी आम्हाला किरकोळ विक्रेत्यांसाठी आणि अंतिम ग्राहकांसाठीही 
                   विश्वासार्ह भागीदार बनवते.`}
            </Typography>
            <Divider sx={{ my: 4 }} />
              <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                  <BusinessIcon fontSize="large" sx={{ color: '#3E2723' }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {lang === 'en' ? 'Our Vision' : 'आम्ही काय साध्य करू इच्छितो'}
                  </Typography>
                  <Typography variant="body2">
                    {lang === 'en'
                      ? 'To be the leading grain supplier known for trust and transparency.'
                      : 'विश्वास आणि पारदर्शकतेसाठी ओळखल्या जाणार्‍या प्रमुख धान्य पुरवठादार होणे.'}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <PeopleIcon fontSize="large" sx={{ color: '#3E2723' }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {lang === 'en' ? 'Our Mission' : 'आमचे पथ्यक'} 
                  </Typography>
                  <Typography variant="body2">
                    {lang === 'en'
                      ? 'Empower farmers and deliver fresh produce to your doorstep.'
                      : 'शेतकऱ्यांना सशक्त करणे आणि ताजी उत्पादने तुमच्या दरवाजापर्यंत पोहोचवणे.'}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <SpaIcon fontSize="large" sx={{ color: '#3E2723' }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {lang === 'en' ? 'Our Values' : 'आमची मूल्ये'}
                  </Typography>
                  <ul style={{ paddingLeft: '1rem' }}>
                    <li>
                      <Typography variant="body2">
                        {lang === 'en' ? 'Quality & Transparency' : 'गुणवत्ता आणि पारदर्शकता'}
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2">
                        {lang === 'en' ? 'Supporting Local Farmers' : 'स्थानिक शेतकऱ्यांना समर्थन'}
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2">
                        {lang === 'en' ? 'Sustainable Practices' : 'शाश्वत पद्धती'}
                      </Typography>
                    </li>
                  </ul>
                </Grid>
              </Grid>
      </Container>
    </Box>
  );
}