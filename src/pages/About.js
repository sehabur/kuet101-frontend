import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';

const About = () => {
  return (
    <Box
      sx={{
        height: { xs: '100%', sm: '65vh' },
        bgcolor: 'secondary.dark',
        py: 8,
        px: 6,
      }}
    >
      <Box sx={{ maxWidth: 600, mx: 'auto' }}>
        <Typography sx={{ mb: 4, color: grey[200], fontSize: '2rem' }}>
          About Kuetians Hub
        </Typography>

        <Typography sx={{ my: 2, color: grey[300], fontSize: '1.2rem' }}>
          Kuetians Hub is developed with a vision to create seamless connection
          amoung the kuetian community and get the utmost advantage of belonging
          to a fabulous alumni.
        </Typography>

        <Typography sx={{ my: 5, color: grey[400], fontSize: '1.1rem' }}>
          Privacy sensitive information like phone numbers, blood group,
          facebook profile are kept optional to provide. All information taken
          hare are merely for community purpose and will never be used or shared
          anywhere else than this platform
        </Typography>
      </Box>
    </Box>
  );
};

export default About;
