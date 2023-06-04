import React from 'react';

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

const AlumniDetails = () => {
  return (
    <Paper sx={{ maxWidth: '950px', mx: 'auto', py: 4 }}>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} sm={3} sx={{}}>
          <Avatar
            src="story.jpg"
            sx={{ width: 150, height: 150, mx: 'auto', mt: 2 }}
          />
        </Grid>

        <Grid item xs={12} sm={9} sx={{ mt: 2 }}>
          <Typography variant="h4">Sehabur Rahman</Typography>
          <Typography variant="h6" color="primary.dark">
            Assistant Manager at Nuclear Company of Bangladesh Limited(NPCBL)
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Electrical and Electronic Emgineering, 2009
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Roll number: 0903042
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AlumniDetails;
