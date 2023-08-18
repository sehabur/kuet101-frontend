import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { grey, red } from '@mui/material/colors';

const Blood = () => {
  return (
    <>
      <Box sx={{ py: 8, bgcolor: 'white' }}>
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
              maxWidth: 450,
              mr: { xs: 0, sm: 10 },
              px: 2,
              textAlign: { xs: 'center', sm: 'left' },
            }}
          >
            <img src="/images/blood_group.png" alt="blood" height="150" />
            <Typography
              variant="h4"
              sx={{ fontSize: '2rem', color: red[900], mt: 2 }}
            >
              Find a blood donor
            </Typography>
            <Typography
              sx={{ fontSize: '1.2rem', color: grey[800], mt: 2, mb: 4 }}
            >
              Get help from Kuetians community to find a blood donor that
              matches your reqirement
            </Typography>
            <Button
              variant="contained"
              color="success"
              component={RouterLink}
              to="/search-blood"
              sx={{ px: 5, py: 1.2, borderRadius: 6, fontSize: '1.1rem' }}
            >
              Search Blood
            </Button>
          </Box>
          <Box
            sx={{
              height: { xs: 250, sm: 300 },
              width: { xs: 300, sm: 340 },
              mt: { xs: 4, sm: 0 },
            }}
          >
            <img
              src="/images/blood.jpg"
              alt="blood"
              height="100%"
              width="100%"
              style={{ borderRadius: 6 }}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Blood;
