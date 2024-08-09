'use client';

import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    customShadows: {
      focused: string;
      dialog: string;
    };
  }

  interface ThemeOptions {
    customShadows?: {
      focused?: string;
      dialog?: string;
    };
  }
}

const theme = createTheme({
  typography: {
    fontFamily: 'IBM_VGA',
    button: {
      borderRadius: '2px',
      textTransform: 'capitalize'
    }
  },
  palette: {
    common: {
      black: '#2A2A2A',
      white: '#FFFFFF'
    },
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
    }
  },
  customShadows: {
    focused: '0px 0px 0px 4px rgba(151, 71, 255, 0.25)',
    dialog: '0px 4px 10px 2px rgba(0, 0, 0, 0.10)'
  }
});

export default theme;
