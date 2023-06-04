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
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
const LearningHub = () => {
  return (
    <Box sx={{ py: 8, textAlign: 'center' }}>
      <Box sx={{ textAlign: 'center', mb: 4, px: 2 }}>
        <Typography variant="h4">Learning Hub</Typography>
        <Typography sx={{ mt: 1, fontSize: '1.3rem' }}>
          Find the learning materials you need from our collection and make
          yourself futureproof.
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Stack direction="row" alignItems="center" sx={{ mt: 1 }}>
          <CheckCircleOutlineIcon sx={{ mr: 1.4 }} color="primary" />
          <Typography sx={{ fontSize: '1.1rem' }}>
            Categorized document section
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" sx={{ mt: 1 }}>
          <CheckCircleOutlineIcon sx={{ mr: 1.4 }} color="primary" />
          <Typography sx={{ fontSize: '1.1rem' }}>
            Download PDF files
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" sx={{ mt: 1 }}>
          <CheckCircleOutlineIcon sx={{ mr: 1.4 }} color="primary" />
          <Typography sx={{ fontSize: '1.1rem' }}>
            Discussion with others
          </Typography>
        </Stack>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ fontSize: '1.1rem', px: 4, py: 1, mt: 4 }}
        >
          Start learning now
        </Button>
      </Box>
    </Box>
  );
};

export default LearningHub;
