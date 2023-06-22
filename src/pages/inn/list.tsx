import type { NextPageWithLayout } from '../_app';
import { DefaultLayout, WideLayout } from '../../components/Templates/Layout';
import type { ReactElement } from 'react';
import { InnTable } from '../../components/Views/Table';

const List: NextPageWithLayout = () => {
  return <InnTable />;
};

List.getLayout = (page: ReactElement) => {
  const title = '宿泊施設一覧';

  return (
    <DefaultLayout title={title}>
      <WideLayout title={title}>{page}</WideLayout>
    </DefaultLayout>
  );
};

export default List;
