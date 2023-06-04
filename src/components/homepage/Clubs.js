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
const Clubs = () => {
  return (
    <Box sx={{ py: 8, bgcolor: 'secondary.dark' }}>
      <Box sx={{ textAlign: 'center', mb: 4, px: 2 }}>
        <Typography variant="h4" sx={{ color: grey[50] }}>
          Club activity
        </Typography>
        <Typography sx={{ color: grey[200], mt: 2 }}>
          Extra curricular acitivties to keep the mind fresh.
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
        <Paper
          elevation={8}
          sx={{ maxWidth: 250, p: 3, pb: 1.2, mx: 5, mb: 2, borderRadius: 2 }}
        >
          <Typography variant="title">KUET Career Club</Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            A heartfelt shoutout to our incredible members for making this
            journey an absolute blast. Let's raise a toast to more memories,
            growth and success together!
          </Typography>
          <Button endIcon={<KeyboardArrowRightIcon />} sx={{ px: 0 }}>
            Explore More
          </Button>
        </Paper>

        <Paper
          elevation={8}
          sx={{ maxWidth: 250, p: 3, pb: 1.2, mx: 5, mb: 2, borderRadius: 2 }}
        >
          <Typography variant="title">KUET Career Club</Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            A heartfelt shoutout to our incredible members for making this
            journey an absolute blast. Let's raise a toast to more memories,
            growth and success together!
          </Typography>
          <Button endIcon={<KeyboardArrowRightIcon />} sx={{ px: 0 }}>
            Explore More
          </Button>
        </Paper>

        <Paper
          elevation={8}
          sx={{ maxWidth: 250, p: 3, pb: 1.2, mx: 5, mb: 2, borderRadius: 2 }}
        >
          <Typography variant="title">KUET Career Club</Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            A heartfelt shoutout to our incredible members for making this
            journey an absolute blast. Let's raise a toast to more memories,
            growth and success together!
          </Typography>
          <Button endIcon={<KeyboardArrowRightIcon />} sx={{ px: 0 }}>
            Explore More
          </Button>
        </Paper>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ fontSize: '1.1rem', px: 4, py: 1, mt: 4 }}
        >
          Show more club activities
        </Button>
      </Box>
    </Box>
  );
};

export default Clubs;
