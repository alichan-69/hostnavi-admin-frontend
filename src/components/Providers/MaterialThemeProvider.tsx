import { CacheProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import type { PropsWithChildren } from 'react';
import { createEmotionCache } from '../../styles';
import { COLOR } from '../../const/color';

// PaletteOptions を拡張して、カラーキーワードを追加
declare module '@mui/material/styles/createPalette' {
  interface PaletteOptions {
    thirdly?: PaletteColorOptions;
  }
}

export const MaterialTheme = createTheme({
  typography: {
    fontFamily: ['游ゴシック', 'ヒラギノ角ゴシック', 'sans-serif'].join(','),
  },
  palette: {
    primary: {
      main: COLOR.PRIMARY,
    },
    secondary: {
      main: COLOR.SECONDARY,
    },
    thirdly: {
      main: COLOR.THIRDLY,
    },
    warning: {
      main: COLOR.WARNING,
    },
  },
});

const clientSideEmotionCache = createEmotionCache();

const MaterialThemeProvider: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={MaterialTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MaterialThemeProvider;
