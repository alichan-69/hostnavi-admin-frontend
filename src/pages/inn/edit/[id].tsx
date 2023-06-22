import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import { DefaultLayout, WideLayout } from '../../../components/Templates/Layout';
import { useEffect, useState } from 'react';
import { EditInnFormPaper } from '../../../components/Views/FormPaper';
import { DangerButton } from '../../../components/Parts/Button';
import type { InnInnResponseData } from '../../../type/responseData/innInn';
import { useRequest } from '../../../hooks/api';
import { getInn } from '../../../utils/api/innInn';

const Id: NextPage = () => {
  const [inn, setInn] = useState<InnInnResponseData>();

  const router = useRouter();
  const { loadingRequest } = useRequest();

  const { id } = router.query;

  const handleClickBack = () => {
    router.push('/inn/list');
  };

  const getInnWrapper = async () => {
    const inn = await getInn(Number(id));
    setInn(inn);
  };

  useEffect(() => {
    // idはnullの場合があるため、取得できたら以降処理に進む
    if (!id) return;

    loadingRequest(getInnWrapper(), '取得中', '取得完了', '取得中にエラーが発生しました');
  }, [id]);

  return (
    <DefaultLayout title={`${inn?.name}の編集` || ''}>
      <WideLayout title={`${inn?.name}の編集` || ''}>
        <div className="children:mb-5">
          <EditInnFormPaper inn={inn} />
          <DangerButton fullWidth={true} label="宿泊施設一覧に戻る" className="mx-auto block" onClick={handleClickBack} />
        </div>
      </WideLayout>
    </DefaultLayout>
  );
};

export default Id;
