import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

import { blueGrey } from '@mui/material/colors';
import ScrollHorizontal from '../shared/ScrollHorizontal.js';
import { clubs } from '../../data/clubDetails.js';

const Clubs = () => {
  return (
    <>
      <Box sx={{ py: 8, bgcolor: blueGrey[50] }}>
        <Box sx={{ textAlign: 'center', mb: 6, px: 2 }}>
          <Typography variant="h4">Clubs</Typography>
        </Box>

        <Box sx={{ maxWidth: '1370px', mx: 'auto' }}>
          <ScrollHorizontal>
            {clubs.map((club) => (
              <Card
                sx={{
                  width: 200,
                  mx: 1.5,
                  borderRadius: 2,
                }}
                elevation={0}
              >
                <CardMedia
                  sx={{ height: 160, m: 2, mb: 0 }}
                  image={`club_logos/${club.imageUrl}`}
                />
                <CardContent sx={{ pb: 0, minHeight: 88 }}>
                  <Typography variant="title" sx={{ fontSize: '1rem' }}>
                    {club.title}
                  </Typography>
                  {/* <Typography sx={{ mt: 1.2 }}>{club.description}</Typography> */}
                </CardContent>
                {/* <CardActions sx={{ pt: 0 }}>
              <Button endIcon={<KeyboardArrowRightIcon />}>Learn More</Button>
            </CardActions> */}
              </Card>
            ))}
          </ScrollHorizontal>
        </Box>

        {/* <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ fontSize: '1.1rem', px: 4, py: 1, mt: 4 }}
          >
            Show more club activities
          </Button>
        </Box> */}
      </Box>
    </>
  );
};

export default Clubs;
