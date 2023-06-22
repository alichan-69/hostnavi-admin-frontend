import type { NextPageWithLayout } from '../_app';
import { DefaultLayout, WideLayout } from '../../components/Templates/Layout';
import type { ReactElement } from 'react';
import { ReservationTable } from '../../components/Views/Table';

const List: NextPageWithLayout = () => {
  return <ReservationTable />;
};

List.getLayout = (page: ReactElement) => {
  const title = '予約一覧';

  return (
    <DefaultLayout title={title}>
      <WideLayout title={title}>{page}</WideLayout>
    </DefaultLayout>
  );
};

export default List;
