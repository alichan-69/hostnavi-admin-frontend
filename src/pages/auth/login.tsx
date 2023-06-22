import type { NextPageWithLayout } from '../_app';
import { DefaultLayout, NarrowLayout } from '../../components/Templates/Layout';
import type { ReactElement } from 'react';
import { LoginFormPaper } from '../../components/Views/FormPaper';

const Login: NextPageWithLayout = () => {
  return <LoginFormPaper />;
};

Login.getLayout = (page: ReactElement) => {
  const title = 'ログイン';

  return (
    <DefaultLayout title={title}>
      <NarrowLayout title={title}>{page}</NarrowLayout>
    </DefaultLayout>
  );
};

export default Login;
