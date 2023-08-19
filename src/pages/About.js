import { Box, Typography } from '@mui/material';
import React from 'react';

const About = () => {
  return (
    <Box>
      <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
        About Kuetians Hub
      </Typography>

      <Typography sx={{ my: 2 }}>
        Kuetians Hub is developed with a vision to create seamless connection
        amoung the kutian community and get the utmost advantage of belonging to
        a fabulous alumni.
      </Typography>
    </Box>
  );
};

export default About;
