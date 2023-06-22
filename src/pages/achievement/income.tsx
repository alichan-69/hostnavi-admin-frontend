import { DefaultLayout, WideLayout } from '../../components/Templates/Layout';
import type { ReactElement, ReactNode } from 'react';
import { MonthlyIncomeChart, YearlyIncomeChart, COMPLETED_PAYMENT_STATUS_IDS } from '../../components/Views/Chart';
import type { ReservationReservationResponseData } from '../../type/responseData/reservationReservation';
import { useState, useEffect } from 'react';
import { useRequest } from '../../hooks/api';
import { getAllReservations } from '../../utils/api/reservationReservation';
import { dayJs } from '../../utils/day';
import { useAuth } from '../../hooks/auth';
import type { NextPageWithLayout } from '../_app';

const Income: NextPageWithLayout = () => {
  const [yearlyReservations, setYearlyReservations] = useState<ReservationReservationResponseData[]>([]);
  const [monthlyReservations, setMonthlyReservations] = useState<ReservationReservationResponseData[]>([]);

  const { loadingRequest } = useRequest();
  const { userId } = useAuth();

  const initialRequestWrapper = async () => {
    if (!userId) throw new Error();

    const responseYearlyReservations = await getAllReservations(
      userId,
      dayJs().startOf('year').toDate(),
      dayJs().endOf('year').toDate(),
      COMPLETED_PAYMENT_STATUS_IDS,
    );
    setYearlyReservations(responseYearlyReservations);

    const responseMonthlyReservations = await getAllReservations(
      userId,
      dayJs().startOf('month').toDate(),
      dayJs().endOf('month').toDate(),
      COMPLETED_PAYMENT_STATUS_IDS,
    );
    setMonthlyReservations(responseMonthlyReservations);
  };

  useEffect(() => {
    // ユーザーidはnullの場合があるため、取得できたら以降処理に進む
    if (!userId) return;

    loadingRequest(initialRequestWrapper(), '取得中', '取得完了', '取得中にエラーが発生しました');
  }, [userId]);

  return (
    <>
      <YearlyIncomeChart initialReservations={yearlyReservations} />
      <MonthlyIncomeChart initialReservations={monthlyReservations} />
    </>
  );
};

Income.getLayout = (page: ReactElement): ReactNode => {
  const title = '収入グラフ';

  return (
    <DefaultLayout title={title}>
      <WideLayout title={title}>{page}</WideLayout>
    </DefaultLayout>
  );
};

export default Income;
