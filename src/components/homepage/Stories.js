import React from 'react';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { grey } from '@mui/material/colors';
const Stories = () => {
  return (
    <Box sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 4, px: 2 }}>
        <Typography variant="h4">Stories</Typography>
        <Typography sx={{ my: 1 }}>
          Read views, perspectives and stories from your alumni community.
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card sx={{ maxWidth: 350, mx: 2, mb: 2 }} square variant="outlined">
          <CardMedia sx={{ height: 230 }} image="story.jpg" />
          <CardContent sx={{ pb: 0 }}>
            <Typography variant="title">
              All Stanford, all together, all in one place. All right now
            </Typography>
            <Typography sx={{ mt: 1.2 }}>
              The Alumni Directory just got a major upgrade! Update your profile
              today and start making more meaningful connections.
            </Typography>
          </CardContent>
          <CardActions sx={{ pt: 0 }}>
            <Button endIcon={<KeyboardArrowRightIcon />}>Learn More</Button>
          </CardActions>
        </Card>

        <Card sx={{ maxWidth: 350, mx: 2, mb: 2 }} square variant="outlined">
          <CardMedia sx={{ height: 230 }} image="story.jpg" />
          <CardContent sx={{ pb: 0 }}>
            <Typography variant="title">
              All Stanford, all together, all in one place. All right now
            </Typography>
            <Typography sx={{ mt: 1.2 }}>
              The Alumni Directory just got a major upgrade! Update your profile
              today and start making more meaningful connections.
            </Typography>
          </CardContent>
          <CardActions sx={{ pt: 0 }}>
            <Button endIcon={<KeyboardArrowRightIcon />}>Learn More</Button>
          </CardActions>
        </Card>

        <Card sx={{ maxWidth: 350, mx: 2, mb: 2 }} square variant="outlined">
          <CardMedia sx={{ height: 230 }} image="story.jpg" />
          <CardContent sx={{ pb: 0 }}>
            <Typography variant="title">
              All Stanford, all together, all in one place. All right now
            </Typography>
            <Typography sx={{ mt: 1.2 }}>
              The Alumni Directory just got a major upgrade! Update your profile
              today and start making more meaningful connections.
            </Typography>
          </CardContent>
          <CardActions sx={{ pt: 0 }}>
            <Button endIcon={<KeyboardArrowRightIcon />}>Learn More</Button>
          </CardActions>
        </Card>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ fontSize: '1.1rem', px: 4, py: 1, mt: 4 }}
        >
          Show more stories
        </Button>
      </Box>
    </Box>
  );
};

export default Stories;
