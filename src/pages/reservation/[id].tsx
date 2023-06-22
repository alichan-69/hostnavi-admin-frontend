import type { NextPageWithLayout } from '../_app';
import { DefaultLayout, NarrowLayout } from '../../components/Templates/Layout';
import type { ReactElement } from 'react';
import ReservationDetailPaper from '../../components/Views/DetailPaper/ReservationDetailPaper';
import { DangerButton } from '../../components/Parts/Button';
import { useRouter } from 'next/router';

const Id: NextPageWithLayout = () => {
  const router = useRouter();

  const handleClickBack = () => {
    router.push('/reservation/list');
  };

  return (
    <div className="children:mb-5">
      <ReservationDetailPaper />
      <DangerButton fullWidth={true} label="予約一覧に戻る" className="mx-auto block" onClick={handleClickBack} />
    </div>
  );
};

Id.getLayout = (page: ReactElement) => {
  const title = '予約';

  return (
    <DefaultLayout title={title}>
      <NarrowLayout title={title}>{page}</NarrowLayout>
    </DefaultLayout>
  );
};

export default Id;
