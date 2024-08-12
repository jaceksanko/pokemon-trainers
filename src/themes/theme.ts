'use client';

import { createTheme } from '@mui/material/styles';
import { variables } from './variables';

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
    },
    h2: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '20px',
      fontStyle: 'normal'
    },
    body1: { fontSize: '14px', fontWeight: 400, lineHeight: '20px', color: variables.grey100 },
    body2: { fontSize: '12px', fontWeight: 400, lineHeight: '20px', color: variables.grey200 }
  },
  palette: {
    common: {
      black: variables.black,
      white: variables.white
    },
    primary: {
      main: variables.primaryMain,
      light: variables.primaryLight,
      dark: variables.primaryDark
    },
    grey: {
      100: variables.grey100,
      200: variables.grey200,
      300: variables.grey300,
      400: variables.grey400
    },
    error: {
      main: variables.errorMain
    }
  },
  customShadows: {
    focused: variables.customShadowFocused,
    dialog: variables.customShadowDialog
  }
});

export default theme;
