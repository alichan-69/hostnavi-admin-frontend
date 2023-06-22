import type { NextPage } from 'next';
import { DefaultLayout, NarrowLayout } from '../../components/Templates/Layout';
import { ReservationChat } from '../../components/Views/Chat';
import { DangerButton } from '../../components/Parts/Button';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRequest } from '../../hooks/api';
import { getReservation } from '../../utils/api/reservationReservation';
import type { WebSocketReservationMessageResponseData } from '../../type/responseData/reservationMessage';
import { getAllMessages } from '../../utils/api/reservationMessage';
import type { ReservationReservationResponseData } from '../../type/responseData/reservationReservation';

const Id: NextPage = () => {
  const [reservation, setReservation] = useState<ReservationReservationResponseData>();
  const [messages, setMessages] = useState<WebSocketReservationMessageResponseData[]>([]);

  const router = useRouter();
  const { loadingRequest } = useRequest();

  const { id } = router.query;

  const initialRequestWrapper = async () => {
    const reservation = await getReservation(Number(id));
    setReservation(reservation);

    const messages = await getAllMessages(Number(id));
    setMessages(messages);
  };

  const handleClickBack = () => {
    router.push('/message/list');
  };

  useEffect(() => {
    // idはnullの場合があるので存在したら以降処理に進む
    if (!id) return;

    loadingRequest(initialRequestWrapper(), '取得中', '取得完了', '取得中にエラーが発生しました');
  }, [id]);

  return (
    <DefaultLayout title={`${reservation?.inn.name}の予約` || ''}>
      <NarrowLayout title={`${reservation?.inn.name}の予約` || ''}>
        <div className="children:mb-5">
          <ReservationChat reservation={reservation} initialMessages={messages} />
          <DangerButton fullWidth={true} label="メッセージ一覧に戻る" className="mx-auto block" onClick={handleClickBack} />
        </div>
      </NarrowLayout>
    </DefaultLayout>
  );
};

export default Id;
