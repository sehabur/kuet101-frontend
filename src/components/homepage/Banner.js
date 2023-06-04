import React from 'react';

import { Box, Button, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
const Banner = () => {
  return (
    <Box
      sx={{
        // backgroundColor: '#202F7A',
        backgroundImage: 'url("ban2.png")',
        backgroundPosition: 'right bottom',
        height: { xs: '300px', sm: '550px' },
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography
          sx={{
            color: `${grey[300]}`,
            fontSize: { xs: '2.2rem', sm: '4rem' },
            fontFamily: 'Noto Sans Display, sans-serif',
            fontWeight: 'bold',
          }}
        >
          Kuetians HUB
        </Typography>

        <Typography
          sx={{
            color: `${grey[100]}`,
            fontSize: { xs: '1.4rem', sm: '2.2rem' },
            fontFamily: 'Proza Libre, sans-serif',
            mt: 1.2,
            mb: { xs: 3, sm: 5 },
          }}
        >
          Stay connected with your Kuetian community
        </Typography>
        <Button
          variant="contained"
          color="success"
          sx={{
            mx: { xs: 1, sm: 2 },
            mb: 2,
            py: 1.5,
            px: { sm: 6 },
            fontSize: '1.1rem',
          }}
        >
          Search alumni
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{
            mx: { xs: 1, sm: 2 },
            mb: 2,
            py: 1.5,
            px: { sm: 6 },
            fontSize: '1.1rem',
          }}
        >
          Find your mates
        </Button>
      </Box>
    </Box>
  );
};

export default Banner;
