import React, { useState } from 'react';
import Logo from '../assets/logo.png';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';


const navItems = [
  { label_en: 'Home', label_mr: 'भाव', to: '/' },
  { label_en: 'About', label_mr: 'आमच्याबद्दल', to: '/about' },
  { label_en: 'Contact', label_mr: 'संपर्क', to: '/contact' },
  // { label_en: 'Admin', label_mr: 'प्रशासक', to: '/admin' },
  { label_en: 'Login',   label_mr: 'लॉगिन',to: '/login'  },
];

export default function Navbar({ lang, setLang }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', width: 250, backgroundColor: '#A1887F', py: 2 }}>
      <Typography variant="h6" sx={{ my: 2, fontFamily: 'Baloo Bhaijaan 2', fontSize: '1.5rem' }}>
        {lang === 'en' ? 'Arihant Trading Co.' : 'अरिहंत ट्रेडिंग कंपनी'}
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.to} disablePadding>
            <ListItemText>
              <Button
                component={RouterLink}
                to={item.to}
                fullWidth
                sx={{
                  textAlign: 'left',
                  fontFamily: lang === 'en' ? 'Hind' : 'Baloo Bhaijaan 2',
                  color: '#3E2723',
                  padding: '0.75rem 1rem',
                  fontSize: '1rem',
                  '&:hover': { backgroundColor: 'rgba(62,39,35,0.1)' }
                }}
              >
                {lang === 'en' ? item.label_en : item.label_mr}
              </Button>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          background: "#f9e9de",
          height: 88,
          borderRadius: '0 0 32px 32px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
        }}
      >
        <Toolbar sx={{ minHeight: 90, px: 4 }}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Box
            component={RouterLink}
            to="/"
            sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', mr: 50 }}
          >
            <Box
              component="img"
              src={Logo}
              alt="Logo"
              sx={{ height: 90, width: 'auto' }}
            />
          </Box>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: '#3E2723',
              fontFamily: 'Baloo Bhaijaan 2',
              fontSize: '2.25rem',
              fontWeight: 800,
              letterSpacing: '1px'
            }}
          >
            {lang === 'en' ? 'Arihant Trading Co.' : 'अरिहंत ट्रेडिंग कंपनी'}
          </Typography>
          {!isMobile && (
            <Box>
              {navItems.map((item) => (
                <Button
                  key={item.to}
                  component={RouterLink}
                  to={item.to}
                  sx={{
                    color: '#3E2723',
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    mx: 2,
                    '&:hover': { backgroundColor: 'rgba(62,39,35,0.1)' }
                  }}
                >
                  {lang === 'en' ? item.label_en : item.label_mr}
                </Button>
              ))}
            </Box>
          )}
          <Button
            color="inherit"
            onClick={() => setLang(lang === 'en' ? 'mr' : 'en')}
            sx={{
              ml: 2,
              border: '1px solid #3E2723',
              borderRadius: 2,
              px: 2,
              color: '#3E2723',
              '&:hover': { backgroundColor: 'rgba(62,39,35,0.1)' }
            }}
          >
            {lang === 'en' ? 'मराठी' : 'English'}
          </Button>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}