import type { NextPageWithLayout } from '../../_app';
import { DefaultLayout, WideLayout } from '../../../components/Templates/Layout';
import type { ReactElement } from 'react';
import ReviewTable from '../../../components/Views/Table/ReviewTable';

const List: NextPageWithLayout = () => {
  return <ReviewTable />;
};

List.getLayout = (page: ReactElement) => {
  const title = 'レビュー一覧';

  return (
    <DefaultLayout title={title}>
      <WideLayout title={title}>{page}</WideLayout>
    </DefaultLayout>
  );
};

export default List;
