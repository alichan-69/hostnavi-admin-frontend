import type { NextPageWithLayout } from './_app';
import { DefaultLayout, NarrowLayout } from '../components/Templates/Layout';
import type { ReactElement } from 'react';
import { ReservationCalender } from '../components/Views/Calender';

const Calender: NextPageWithLayout = () => {
  return <ReservationCalender />;
};

Calender.getLayout = (page: ReactElement) => {
  const title = '予約カレンダー';

  return (
    <DefaultLayout title={title}>
      <NarrowLayout title={title}>{page}</NarrowLayout>
    </DefaultLayout>
  );
};

export default Calender;
