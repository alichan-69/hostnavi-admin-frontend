import type { NextPageWithLayout } from './_app';
import { DefaultLayout, WideLayout } from '../components/Templates/Layout';
import type { ReactElement } from 'react';
import { TodayReservationTable } from '../components/Views/Table';

const List: NextPageWithLayout = () => {
  return <TodayReservationTable />;
};

List.getLayout = (page: ReactElement) => {
  const title = '今日の予約一覧';

  return (
    <DefaultLayout title={title}>
      <WideLayout title={title}>{page}</WideLayout>
    </DefaultLayout>
  );
};

export default List;
