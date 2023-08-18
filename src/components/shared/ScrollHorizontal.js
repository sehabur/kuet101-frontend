import React from 'react';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, IconButton } from '@mui/material';

import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import './hideScroll.css';
import { grey } from '@mui/material/colors';

const ScrollHorizontal = ({ children }) => {
  const LeftArrow = () => {
    const { isFirstItemVisible, scrollPrev } =
      React.useContext(VisibilityContext);

    return (
      <IconButton
        disabled={isFirstItemVisible}
        onClick={() => scrollPrev()}
        sx={{
          opacity: isFirstItemVisible ? '0' : '1',
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
      >
        <ArrowBackIosNewIcon
          sx={{
            fontSize: { xs: '1.5rem', sm: '3.2rem' },
            color: { xs: 'primary.dark', sm: grey[100] },
            bgcolor: { xs: 'transparent', sm: 'secondary.light' },
            borderRadius: '50%',
            p: { xs: 0, sm: 1.8 },
          }}
        />
      </IconButton>
    );
  };

  const RightArrow = () => {
    const { isLastItemVisible, scrollNext } =
      React.useContext(VisibilityContext);

    return (
      <IconButton
        disabled={isLastItemVisible}
        onClick={() => scrollNext()}
        sx={{
          opacity: isLastItemVisible ? '0' : '1',
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
      >
        <ArrowForwardIosIcon
          sx={{
            fontSize: { xs: '1.5rem', sm: '3.2rem' },
            color: { xs: 'primary.dark', sm: grey[100] },
            bgcolor: { xs: 'transparent', sm: 'secondary.light' },
            borderRadius: '50%',
            p: { xs: 0, sm: 1.8 },
          }}
        />
      </IconButton>
    );
  };

  return (
    <Box>
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {children}
      </ScrollMenu>
    </Box>
  );
};

export default ScrollHorizontal;
