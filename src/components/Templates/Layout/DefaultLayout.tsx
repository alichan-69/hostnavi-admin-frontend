import Head from 'next/head';
import DefaultHeader from '../DefaultHeader';
// import DefaultFooter from '../DefaultFooter';
import { PropsWithChildren, useContext } from 'react';
import { Toaster } from 'react-hot-toast';
import { Backdrop, CircularProgress } from '@mui/material';
import { LoadingContext } from '../../Providers/LoadingProvider';

const DefaultLayout = ({ title, children }: PropsWithChildren<{ title: string }>) => {
  const pageTitle = `${title} | ${process.env['NEXT_PUBLIC_TITLE']}`;

  const { loading } = useContext(LoadingContext);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div>
        <Backdrop
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={loading}
        >
          <CircularProgress color="primary" />
        </Backdrop>
        <DefaultHeader />
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 3000,
          }}
        />
        {children}
      </div>
    </>
  );
};

export default DefaultLayout;
