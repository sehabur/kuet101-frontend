import React from 'react';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { grey } from '@mui/material/colors';
import { Link as RouterLink } from 'react-router-dom';

const LearningHub = () => {
  return (
    <Box sx={{ py: { xs: 6, sm: 10 }, backgroundColor: 'secondary.dark' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            height: { xs: 270, sm: 350 },
            width: { xs: 330, sm: 420 },
            mr: { xs: 0, sm: 8 },
            mb: { xs: 4, sm: 0 },
            px: { xs: 2, sm: 0 },
          }}
        >
          <img
            src="/images/online_learning.jpg"
            alt="blood"
            height="100%"
            width="100%"
            style={{ borderRadius: 16 }}
          />
        </Box>
        <Box
          sx={{
            maxWidth: 530,
            mr: { xs: 0, sm: 10 },
            px: 2,
            textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          <Box sx={{ mb: 4, px: 2 }}>
            <Typography
              gutterBottom
              variant="h4"
              sx={{ fontSize: '2rem', color: grey[100] }}
            >
              Learning Hub
            </Typography>
            <Typography sx={{ mt: 1, fontSize: '1.1rem', color: grey[300] }}>
              Find the learning materials you need from our collection and make
              yourself futureproof.
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', sm: 'flex-start' },

              mx: 2,
            }}
          >
            <Paper
              component={Stack}
              direction="row"
              alignItems="center"
              sx={{ mt: 1, px: 2, py: 1, width: 320 }}
              elevation={0}
            >
              <CheckCircleOutlineIcon sx={{ mr: 1.4 }} color="success" />
              <Typography sx={{ fontSize: '1rem' }} color="info.dark">
                Categorized document section
              </Typography>
            </Paper>

            <Paper
              component={Stack}
              direction="row"
              alignItems="center"
              sx={{ mt: 1, px: 2, py: 1, width: 320 }}
              elevation={0}
            >
              <CheckCircleOutlineIcon sx={{ mr: 1.4 }} color="success" />
              <Typography sx={{ fontSize: '1.1rem' }} color="info.dark">
                Department wise resources
              </Typography>
            </Paper>

            <Paper
              component={Stack}
              direction="row"
              alignItems="center"
              sx={{ mt: 1, px: 2, py: 1, width: 320 }}
              elevation={0}
            >
              <CheckCircleOutlineIcon sx={{ mr: 1.4 }} color="success" />
              <Typography sx={{ fontSize: '1.1rem' }} color="info.dark">
                Download any files you need
              </Typography>
            </Paper>
          </Box>

          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/learning"
            sx={{
              px: 5,
              py: 1.2,
              mt: 6,
              ml: 2,
              borderRadius: 6,
              fontSize: '1.1rem',
            }}
          >
            Start learning now
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LearningHub;
