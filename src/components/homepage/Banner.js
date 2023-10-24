import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Box, Card, CardContent, Typography } from '@mui/material';
// import ReactPlayer from 'react-player/lazy';

const Banner = () => {
  const bannerNames = ['1.jpg', '2.jpg', '3.jpg', '4.jpg'];

  return (
    <Box sx={{ position: 'relative' }}>
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
              height: { xs: '300px', sm: '600px' },
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center center',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              // backgroundSize: 'contain',
              backgroundSize: '100%',
            }}
          ></Box>
        ))}
      </Carousel>

      <Card
        sx={{
          width: { xs: 300, sm: 650 },
          opacity: '0.85',
          py: { sm: 2.5 },
          px: { sm: 4 },
          borderRadius: 3,
          zIndex: 1,
          position: 'absolute',
          bottom: { xs: -50, sm: -90 },
          left: 0,
          right: 0,
          mx: 'auto',
        }}
        style={{
          'background-image': 'linear-gradient(0deg,#162055 12%,#202F7A 53%)',
        }}
        elevation={0}
      >
        <CardContent>
          <Typography
            sx={{
              lineHeight: 1.7,
              textAlign: 'center',
              fontSize: {
                xs: '1.2rem',
                sm: '2rem',
              },
              color: '#fff',
              fontFamily: "'Barlow', sans-serif",
              // fontWeight: 500,
            }}
          >
            Get conneted and start sharing with your kuetian community
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Banner;
