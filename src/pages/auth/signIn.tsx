import type { NextPageWithLayout } from '../_app';
import { DefaultLayout, NarrowLayout } from '../../components/Templates/Layout';
import type { ReactElement } from 'react';
import { SignInFormPaper } from '../../components/Views/FormPaper';

const SignIn: NextPageWithLayout = () => {
  return <SignInFormPaper />;
};

SignIn.getLayout = (page: ReactElement) => {
  const title = 'ユーザー登録';

  return (
    <DefaultLayout title={title}>
      <NarrowLayout title={title}>{page}</NarrowLayout>
    </DefaultLayout>
  );
};

export default SignIn;
