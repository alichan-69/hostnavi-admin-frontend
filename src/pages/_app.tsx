import { ReactElement, ReactNode, useEffect } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import '../styles/global.scss';
import Providers from '../components/Providers';
import Cookies from 'js-cookie';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps, router }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    // 各ページにアクセスした際に必ず実行される処理
    // ログインページとサインインページは除外
    if (router.pathname === '/auth/login' || router.pathname === '/auth/signIn') return;
    // もし認証用のjwtが存在しなかったらログインページに遷移する
    const jwt = Cookies.get('X-AUTH-TOKEN') as string;
    if (!jwt) router.push('/auth/login');
  }, [router.pathname]);

  return <Providers>{getLayout(<Component {...pageProps} />)}</Providers>;
};

export default App;
