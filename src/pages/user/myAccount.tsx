import type { NextPageWithLayout } from '../_app';
import { DefaultLayout, NarrowLayout } from '../../components/Templates/Layout';
import type { ReactElement } from 'react';
import { MyAccountDetailPaper } from '../../components/Views/DetailPaper';
import { DangerButton } from '../../components/Parts/Button';
import { useRouter } from 'next/router';

const MyAccount: NextPageWithLayout = () => {
  const router = useRouter();

  const handleClickBack = () => {
    router.back();
  };

  return (
    <div className="children:mb-5">
      <MyAccountDetailPaper />
      <DangerButton fullWidth={true} label="戻る" className="mx-auto block" onClick={handleClickBack} />
    </div>
  );
};

MyAccount.getLayout = (page: ReactElement) => {
  const title = 'アカウント情報';

  return (
    <DefaultLayout title={title}>
      <NarrowLayout title={title}>{page}</NarrowLayout>
    </DefaultLayout>
  );
};

export default MyAccount;
