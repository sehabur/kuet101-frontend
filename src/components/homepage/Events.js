import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PlaceIcon from '@mui/icons-material/Place';
import { grey } from '@mui/material/colors';

const Events = ({ events }) => {
  return (
    <Box sx={{ py: 8, backgroundColor: grey[50] }}>
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
        {events?.slice(0, 2).map((event) => (
          <Box sx={{ p: 3, maxWidth: '500px', minWidth: '350px' }}>
            <Typography sx={{ fontSize: '1.2rem' }}>{event.month}</Typography>
            <Typography variant="h3" sx={{ mb: 2 }}>
              {event.date}
            </Typography>

            <Typography variant="title">{event.title}</Typography>
            <Stack direction="row" alignItems="center" sx={{ mt: 2 }}>
              <CalendarMonthIcon sx={{ mr: 1.4 }} color="success" />
              <Typography>{event.detailedDate}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" sx={{ mt: 0.7 }}>
              <PlaceIcon sx={{ mr: 1.4 }} color="success" />
              <Typography>{event.location}</Typography>
            </Stack>
            <Button
              endIcon={<KeyboardArrowRightIcon />}
              sx={{ fontSize: '1.1rem', mt: 2 }}
            >
              See Details
            </Button>
          </Box>
        ))}
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
