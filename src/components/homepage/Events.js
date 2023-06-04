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
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PlaceIcon from '@mui/icons-material/Place';
import { grey } from '@mui/material/colors';

const Events = () => {
  return (
    <Box sx={{ py: 8, backgroundColor: grey[200] }}>
      <Box sx={{ textAlign: 'center', px: 2 }}>
        <Typography variant="h4">Events</Typography>
        <Typography variant="body1" sx={{ my: 1 }}>
          Peek at events happening in your community.
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
        <Box sx={{ p: 3, maxWidth: '500px' }}>
          <Typography sx={{ fontSize: '1.2rem' }}>MAY</Typography>
          <Typography variant="h3" sx={{ mb: 2 }}>
            31
          </Typography>

          <Typography variant="title">
            Virtual Book Club: The Indigo Girl (external link)
          </Typography>
          <Stack direction="row" alignItems="center" sx={{ mt: 2 }}>
            <CalendarMonthIcon sx={{ mr: 1.4 }} color="success" />
            <Typography>May 31, 2023</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" sx={{ mt: 0.7 }}>
            <PlaceIcon sx={{ mr: 1.4 }} color="success" />
            <Typography>KUET Campus</Typography>
          </Stack>
          <Button
            endIcon={<KeyboardArrowRightIcon />}
            sx={{ fontSize: '1.1rem', mt: 2 }}
          >
            See Details
          </Button>
        </Box>

        <Box sx={{ p: 3, maxWidth: '500px' }}>
          <Typography sx={{ fontSize: '1.2rem' }}>MAY</Typography>
          <Typography variant="h3" sx={{ mb: 2 }}>
            31
          </Typography>

          <Typography variant="title">
            Virtual Book Club: The Indigo Girl (external link)
          </Typography>
          <Stack direction="row" alignItems="center" sx={{ mt: 2 }}>
            <CalendarMonthIcon sx={{ mr: 1.4 }} color="success" />
            <Typography>May 31, 2023</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" sx={{ mt: 0.7 }}>
            <PlaceIcon sx={{ mr: 1.4 }} color="success" />
            <Typography>KUET Campus</Typography>
          </Stack>
          <Button
            endIcon={<KeyboardArrowRightIcon />}
            sx={{ fontSize: '1.1rem', mt: 2 }}
          >
            See Details
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ fontSize: '1.1rem', px: 4, py: 1 }}
        >
          Show more events
        </Button>
      </Box>
    </Box>
  );
};

export default Events;
