'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'IBM_VGA'
  },
  palette: {
    primary: {
      main: '#9747FF',
      light: 'rgba(151, 71, 255, 0.25)',
      dark: '#7135BF'
    },
    grey: {
      100: '#2A2A2A',
      200: '#7F7F7F',
      300: '#E4E4E4',
      400: '#EEE'
    },
    error: {
      main: '#FF4E4E'
    },
    background: {}
  }
});

export default theme;
