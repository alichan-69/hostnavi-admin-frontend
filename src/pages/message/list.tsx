import type { NextPageWithLayout } from '../_app';
import { DefaultLayout, WideLayout } from '../../components/Templates/Layout';
import type { ReactElement } from 'react';
import { MessageTable } from '../../components/Views/Table';

const List: NextPageWithLayout = () => {
  return <MessageTable />;
};

List.getLayout = (page: ReactElement) => {
  const title = '最新のメッセージ一覧';

  return (
    <DefaultLayout title={title}>
      <WideLayout title={title}>{page}</WideLayout>
    </DefaultLayout>
  );
};

export default List;
