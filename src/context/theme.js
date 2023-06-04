import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5457FF',
      light: '#7678ff',
      dark: '#3a3cb2',
      contrastText: '#FFF',
    },
    secondary: {
      main: '#202F7A',
      light: '#4c5894',
      dark: '#162055',
      contrastText: '#FFF',
    },
  },
  typography: {
    fontFamily: 'Rubik, sans-serif',
    h4: {
      fontFamily: 'Proza Libre, sans-serif',
      fontSize: '2.3rem',
      fontWeight: 700,
      color: '#162055',
    },
    title: {
      fontSize: '1.4rem',
      fontWeight: 700,
      color: '#202F7A',
      lineHeight: 1.3,
    },
  },
  components: {
    // MuiTypography: {
    //   defaultProps: {
    //     variant: 'body2',
    //   },
    // },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: '1rem',
        },
      },
    },
  },
});

export default theme;
