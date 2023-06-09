import {
  Box,
  Container,
  Grid,
  Link,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Stack,
  IconButton,
} from '@mui/material';
import { grey, yellow, blue } from '@mui/material/colors';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import FacebookIcon from '@mui/icons-material/Facebook';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const footerMenu = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'Find alumni',
    link: '/findPost',
  },
  {
    name: 'Explore your mates',
    link: '/createPost',
  },
  {
    name: 'Learning Hub',
    link: '/exploreShops',
  },
  {
    name: 'Upcoming events',
    link: '/notification',
  },
  {
    name: 'Stories',
    link: '/myAccount#0',
  },
];

const footerSecondMenu = [
  {
    name: 'About Us',
    link: '/',
  },
  {
    name: 'Terms & Condition',
    link: '/',
  },
  {
    name: 'Privacy Policy',
    link: '/',
  },
];

const Footer = () => {
  return (
    <Paper
      sx={{
        pt: 2,
        borderTop: `1.5px solid ${grey[300]}`,
        borderRadius: 0,
        backgroundColor: grey[100],
      }}
    >
      <Box
        sx={{
          py: 2,
          px: { xs: 2, sm: 0 },
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'flex-start',
          justifyContent: 'center',
          spacing: '2rem',
        }}
      >
        <Box sx={{ my: 'auto' }}>
          <img src="logo.png" alt="logo" width="220" />
        </Box>

        <Box sx={{ mx: 6 }}>
          <List>
            <ListItem alignItems="flex-start" disablePadding dense>
              <ListItemIcon>
                <WhatsAppIcon color="success" />
              </ListItemIcon>
              <ListItemText primary="WhatsApp" secondary="01311086137" />
            </ListItem>

            <ListItem alignItems="flex-start" disablePadding dense>
              <ListItemIcon>
                <EmailIcon color="info" />
              </ListItemIcon>
              <ListItemText
                primary="Email Us"
                secondary="sehabur42@gmail.com"
              />
            </ListItem>

            <ListItem alignItems="flex-start" disablePadding dense>
              <ListItemIcon>
                <CallIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Call Us" secondary="01311086137" />
            </ListItem>
          </List>
        </Box>

        <Box sx={{ mx: 6 }}>
          <List>
            {footerMenu.map((menuItem) => (
              <Stack direction="row">
                {/* <ArrowRightIcon sx={{ color: 'gray' }} /> */}
                <Typography
                  component={RouterLink}
                  to={menuItem.link}
                  sx={{
                    textDecoration: 'none',
                    color: 'secondary.main',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                    mb: 0.7,
                  }}
                >
                  {menuItem.name}
                </Typography>
              </Stack>
            ))}
          </List>
        </Box>

        <Box sx={{ mx: 6 }}>
          <List>
            {footerSecondMenu.map((menuItem) => (
              <Stack direction="row">
                <Typography
                  component={RouterLink}
                  to={menuItem.link}
                  sx={{
                    textDecoration: 'none',
                    color: 'secondary.main',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                    mb: 0.7,
                  }}
                >
                  {menuItem.name}
                </Typography>
              </Stack>
            ))}
          </List>

          {/* <Stack direction="row" alignItems="center">
            <Typography sx={{ fontSize: '1rem' }}>Follow us on</Typography>
            <IconButton component={RouterLink} to="/">
              <FacebookIcon sx={{ color: 'primary.main', fontSize: '2rem' }} />
            </IconButton>
          </Stack> */}
        </Box>
      </Box>

      <Box sx={{ textAlign: 'center', pb: 3 }}>
        <Typography>© Kuetianshub.com 2023</Typography>
      </Box>
    </Paper>
  );
};

export default Footer;
