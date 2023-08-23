import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
// import ReactPlayer from 'react-player/lazy';

const Banner = () => {
  const bannerNames = [
    // 'banner_1.jpg',
    // 'banner_2.jpg',
    // 'banner_3.jpg',
    // 'banner_4.jpeg',
    // '1.jpg',
    '3.jpg',
    '4.jpg',
    '5.jpg',
    '2.jpg',
  ];

  const cardText = (
    <Card
      sx={{
        maxWidth: 650,
        opacity: '0.85',
        py: { sm: 2.5 },
        px: { sm: 4 },
        mx: { xs: 6, sm: 0 },
        borderRadius: 1,
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
              height: { xs: '300px', sm: '600px' },
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center center',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              // backgroundSize: 'contain',
              backgroundSize: '100%',
            }}
          >
            <Box sx={{ mb: 4 }}>{cardText}</Box>
          </Box>
        ))}
      </Carousel>
    </>
  );
};

export default Banner;
