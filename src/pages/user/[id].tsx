import type { NextPageWithLayout } from '../_app';
import { DefaultLayout, NarrowLayout } from '../../components/Templates/Layout';
import type { ReactElement } from 'react';
import UserDetailPaper from '../../components/Views/DetailPaper/UserDetailPaper';
import { DangerButton } from '../../components/Parts/Button';
import { useRouter } from 'next/router';

const Id: NextPageWithLayout = () => {
  const router = useRouter();

  const handleClickBack = () => {
    router.back();
  };

  return (
    <div className="children:mb-5">
      <UserDetailPaper />
      <DangerButton fullWidth={true} label="戻る" className="mx-auto block" onClick={handleClickBack} />
    </div>
  );
};

Id.getLayout = (page: ReactElement) => {
  const title = 'ユーザー';

  return (
    <DefaultLayout title={title}>
      <NarrowLayout title={title}>{page}</NarrowLayout>
    </DefaultLayout>
  );
};

export default Id;
