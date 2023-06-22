import type { NextPageWithLayout } from '../../_app';
import { DefaultLayout, NarrowLayout } from '../../../components/Templates/Layout';
import type { ReactElement } from 'react';
import { ReviewDetailPaper } from '../../../components/Views/DetailPaper';
import { DangerButton } from '../../../components/Parts/Button';
import { useRouter } from 'next/router';

const Index: NextPageWithLayout = () => {
  const router = useRouter();

  const handleClickBack = () => {
    router.push('/achievement/review/list');
  };

  return (
    <div className="children:mb-5">
      <ReviewDetailPaper />
      <DangerButton fullWidth={true} label="レビュー一覧に戻る" className="mx-auto block" onClick={handleClickBack} />
    </div>
  );
};

Index.getLayout = (page: ReactElement) => {
  const title = 'レビュー';

  return (
    <DefaultLayout title={title}>
      <NarrowLayout title={title}>{page}</NarrowLayout>
    </DefaultLayout>
  );
};

export default Index;
