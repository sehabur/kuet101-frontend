import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  List,
  Stack,
  Divider,
  Grid,
  Link,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';

const footerMenu = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'Search alumni',
    link: '/search-alumni',
  },
  {
    name: 'Find your mates',
    link: '/find-your-mates',
  },
  {
    name: 'Learning Hub',
    link: '/learning',
  },
  {
    name: 'Photo Gallery',
    link: '/gallery',
  },
  {
    name: 'Posts',
    link: '/posts',
  },
];

const footerSecondMenu = [
  {
    name: 'About us',
    link: '/aboutus',
  },
  {
    name: 'KUET Website',
    link: 'https://kuet.ac.bd/',
  },
];

const Footer = () => {
  return (
    <Paper
      sx={{
        borderTop: `1.5px solid ${grey[300]}`,
        borderRadius: 0,
        backgroundColor: grey[100],
      }}
      elevation={0}
    >
      <Box sx={{ maxWidth: '850px', mx: 'auto', py: 3 }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={12} sm={5}>
            <Box sx={{ ml: { xs: 6, sm: 0 } }}>
              <img src="/images/logo.png" alt="logo" width="220" />
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box sx={{ ml: { xs: 7.5, sm: 0 }, mb: { xs: 1, sm: 0 } }}>
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
                      }}
                    >
                      {menuItem.name}
                    </Typography>
                  </Stack>
                ))}
              </List>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ ml: { xs: 7.2, sm: 0 } }}>
              <Stack direction="row" spacing={1.5}>
                <EmailIcon color="primary" />
                <Typography>kuetianshub@gmail.com</Typography>
              </Stack>
            </Box>
          </Grid>
        </Grid>
        <Divider light sx={{ my: 2 }} />

        <Grid
          container
          sx={{
            justifyContent: { xs: 'center', sm: 'space-between' },
            px: 0.5,
          }}
        >
          <Grid item>
            <Typography sx={{ mb: 1 }}>
              Copyright © Kuetianshub.com {new Date().getFullYear()}
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              Developed by{' '}
              <Link target="_blank" href="https://purplesoft.tech/">
                Purplesoft.tech
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* <Box
        sx={{
          py: 2,
          px: { xs: 2, sm: 0 },
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'flex-start',
          justifyContent: 'center',
          maxWidth: '800px',
          mx: 'auto',
        }}
      >
        <Box sx={{ my: 'auto' }}>
          <img src="/images/logo.png" alt="logo" width="220" />
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

          <Stack direction="row" alignItems="center">
            <Typography sx={{ fontSize: '1rem' }}>Follow us on</Typography>
            <IconButton component={RouterLink} to="/">
              <FacebookIcon sx={{ color: 'primary.main', fontSize: '2rem' }} />
            </IconButton>
          </Stack>
        </Box>

        <Box>
          <Stack direction="row" spacing={1.5}>
            <EmailIcon color="primary" />
            <Typography>support@kuetianshub.com</Typography>
          </Stack>
        </Box>

        <Box sx={{ mx: 6 }}>
          <List>
            <ListItem alignItems="flex-start" disablePadding dense>
              <ListItemIcon>
                <WhatsAppIcon color="success" />
              </ListItemIcon>
              <ListItemText primary="WhatsApp" secondary="01311086137" />
            </ListItem>

            <ListItem alignItems="center" disablePadding dense>
              <ListItemIcon>
                <EmailIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Email"
                secondary="support@kuetianshub.com"
              />
            </ListItem>

            <ListItem alignItems="flex-start" disablePadding dense>
              <ListItemIcon>
                <CallIcon color="info" />
              </ListItemIcon>
              <ListItemText primary="Contact" secondary="01311086137" />
            </ListItem>
          </List>
        </Box>

        <Box sx={{ mx: 6 }}>
          <List>
            {footerMenu.map((menuItem) => (
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
        </Box>
      </Box> */}
    </Paper>
  );
};

export default Footer;
