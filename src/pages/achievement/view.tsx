import type { NextPageWithLayout } from '../_app';
import { DefaultLayout, WideLayout } from '../../components/Templates/Layout';
import type { ReactElement, ReactNode } from 'react';
import { MonthlyViewChart, YearlyViewChart } from '../../components/Views/Chart';
import type { InnViewResponseData } from '../../type/responseData/innView';
import { useState, useEffect } from 'react';
import { useRequest } from '../../hooks/api';
import { getAllViews } from '../../utils/api/innView';
import { dayJs } from '../../utils/day';
import { useAuth } from '../../hooks/auth';

const View: NextPageWithLayout = () => {
  const [yearlyViews, setYearlyViews] = useState<InnViewResponseData[]>([]);
  const [monthlyViews, setMonthlyViews] = useState<InnViewResponseData[]>([]);

  const { loadingRequest } = useRequest();
  const { userId } = useAuth();

  const initialRequestWrapper = async () => {
    if (!userId) throw new Error();

    const responseYearlyViews = await getAllViews(userId, dayJs().startOf('year').toDate(), dayJs().endOf('year').toDate());
    setYearlyViews(responseYearlyViews);

    const responseMonthlyViews = await getAllViews(userId, dayJs().startOf('month').toDate(), dayJs().endOf('month').toDate());
    setMonthlyViews(responseMonthlyViews);
  };

  useEffect(() => {
    // ユーザーidはnullの場合があるため、取得できたら以降処理に進む
    if (!userId) return;

    loadingRequest(initialRequestWrapper(), '取得中', '取得完了', '取得中にエラーが発生しました');
  }, [userId]);

  return (
    <>
      <YearlyViewChart initialViews={yearlyViews} />
      <MonthlyViewChart initialViews={monthlyViews} />
    </>
  );
};

View.getLayout = (page: ReactElement): ReactNode => {
  const title = '宿泊施設の閲覧数グラフ';

  return (
    <DefaultLayout title={title}>
      <WideLayout title={title}>{page}</WideLayout>
    </DefaultLayout>
  );
};

export default View;
