import { createContext, PropsWithChildren, useState } from 'react';

export const LoadingContext = createContext({
  loading: false,
  startLoading: () => {
    return;
  },
  finishLoading: () => {
    return;
  },
});

const LoadingProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const startLoading = () => {
    setLoading(true);
  };

  const finishLoading = () => {
    setLoading(false);
  };

  return <LoadingContext.Provider value={{ loading, startLoading, finishLoading }}>{children}</LoadingContext.Provider>;
};

export default LoadingProvider;
