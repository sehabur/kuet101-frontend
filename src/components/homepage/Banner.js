import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
// import ReactPlayer from 'react-player/lazy';

const Banner = () => {
  const bannerNames = [
    'banner_1.jpg',
    'banner_2.jpg',
    'banner_3.jpg',
    'banner_4.jpeg',
  ];

  const cardText = (
    <Card
      sx={{
        maxWidth: 710,
        bgcolor: 'white',
        opacity: '0.85',
        py: { xs: 1, sm: 2.5 },
        px: { xs: 2, sm: 4 },
        mx: { xs: 6, sm: 0 },
        borderRadius: 2,
      }}
      elevation={0}
    >
      <CardContent>
        <Typography
          sx={{
            lineHeight: 1.7,
            textAlign: 'center',
            fontSize: {
              xs: '1.4rem',
              sm: '2.2rem',
            },
            color: '#3d3f42',
            fontFamily: 'Roboto',
            fontWeight: 300,
          }}
        >
          Get conneted and start sharing with your kuetian community
        </Typography>
      </CardContent>
    </Card>
  );
  return (
    <>
      <Carousel autoPlay={true} stopAutoPlayOnHover={false} indicators={false}>
        {/* <Box>
          <ReactPlayer
            url="banners/banner_4.mp4"
            playing={true}
            volume={0}
            width="1000px"
            height="100%"
            style={{ textAlign: 'center', margin: 'auto' }}
          />
        </Box> */}

        {bannerNames.map((item) => (
          <Box
            sx={{
              backgroundImage: `url(banners/${item})`,
              height: { xs: '350px', sm: '550px' },
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {cardText}
          </Box>
        ))}
      </Carousel>
    </>
  );
};

export default Banner;
