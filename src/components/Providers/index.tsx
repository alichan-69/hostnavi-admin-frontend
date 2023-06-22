import LoadingProvider from './LoadingProvider';
import MaterialThemeProvider from './MaterialThemeProvider';
import type { PropsWithChildren } from 'react';

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <MaterialThemeProvider>
      <LoadingProvider>{children}</LoadingProvider>
    </MaterialThemeProvider>
  );
};

export default Providers;
