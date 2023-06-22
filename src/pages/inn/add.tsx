import type { NextPageWithLayout } from '../_app';
import { DefaultLayout, NarrowLayout } from '../../components/Templates/Layout';
import type { ReactElement, ReactNode } from 'react';
import { DangerButton } from '../../components/Parts/Button';
import { useRouter } from 'next/router';
import { AddInnFormPaper } from '../../components/Views/FormPaper';

const Add: NextPageWithLayout = () => {
  const router = useRouter();

  const handleClickBack = () => {
    router.push('/inn/list');
  };

  return (
    <div className="children:mb-5">
      <AddInnFormPaper />
      <DangerButton fullWidth={true} label="宿泊施設一覧に戻る" className="mx-auto block" onClick={handleClickBack} />
    </div>
  );
};

Add.getLayout = (page: ReactElement): ReactNode => {
  const title = '宿泊施設の追加';

  return (
    <DefaultLayout title={title}>
      <NarrowLayout title={title}>{page}</NarrowLayout>
    </DefaultLayout>
  );
};

export default Add;
