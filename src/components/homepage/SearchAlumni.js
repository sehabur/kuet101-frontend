import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';

const SearchAlumni = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        pt: { xs: 10, sm: 18 },
        pb: { xs: 4, sm: 8 },
        px: { xs: 2, sm: 0 },
        bgcolor: grey[100],
      }}
    >
      <Card
        sx={{
          maxWidth: 580,
          py: 3,
          mr: { sm: 8 },
          mb: { xs: 2, sm: 0 },
        }}
        elevation={0}
      >
        <Box sx={{ px: 2 }}>
          <CardMedia
            component="img"
            alt="search alumni"
            height="140"
            image="/images/search_alumni.jpeg"
          />
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" color="primary">
            Search people in your community
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '1rem' }}>
            Search for an alumni with advanced search options and get in touch
            with them
          </Typography>
        </CardContent>
        <CardActions sx={{ px: 2 }}>
          <Button variant="outlined" component={RouterLink} to="/search-alumni">
            Search alumni
          </Button>
        </CardActions>
      </Card>

      <Card
        sx={{
          maxWidth: 580,
          py: 3,
        }}
        elevation={0}
      >
        <Box sx={{ px: 2 }}>
          <CardMedia
            component="img"
            alt="find mates"
            height="140"
            image="/images/find_your_mates.jpeg"
          />
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" color="primary">
            Find the mates you used to hang
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '1rem' }}>
            Find out the people use used to be together in your batch,
            department, home district etc.
          </Typography>
        </CardContent>
        <CardActions sx={{ px: 2 }}>
          <Button
            variant="outlined"
            component={RouterLink}
            to="/find-your-mates"
            sx={{ px: 2 }}
          >
            Find your mates
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default SearchAlumni;
