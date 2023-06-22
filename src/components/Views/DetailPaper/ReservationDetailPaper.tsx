import DetailPaper, { Details } from '../../../components/Templates/DetailPaper';
import {
  RESERVATION_STATUS_IDENTIFIER_JAPANESE,
  RESERVATION_STATUS_IDENTIFIER_ENGLISH,
  RESERVATION_RESERVER_IDENTIFIER_JAPANESE,
  RESERVATION_RESERVER_IDENTIFIER_ENGLISH,
  CHECK_IN_TIME_IDENTIFIER_JAPANESE,
  CHECK_IN_TIME_IDENTIFIER_ENGLISH,
  CHECK_OUT_TIME_IDENTIFIER_JAPANESE,
  CHECK_OUT_TIME_IDENTIFIER_ENGLISH,
  GUEST_NUMBER_IDENTIFIER_JAPANESE,
  GUEST_NUMBER_IDENTIFIER_ENGLISH,
} from '../../../const/reservation';
import {
  INN_NAME_IDENTIFIER_JAPANESE,
  INN_NAME_IDENTIFIER_ENGLISH,
  INN_FEE_IDENTIFIER_ENGLISH,
  INN_FEE_IDENTIFIER_JAPANESE,
} from '../../../const/inn';
import { CHAT_IDENDIFIER_JAPANESE, CHAT_IDENDIFIER_ENGLISH } from '../../../const/message';
import { NextLink } from '../../Parts/Link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getReservation } from '../../../utils/api/reservationReservation';
import { dayJs } from '../../../utils/day';
import { YEAR_MONTH_DAY_HOUR_MINUTE_TIME_FORMAT } from '../../../const/date';
import { useRequest } from '../../../hooks/api';

const ReservationDetailPaper = () => {
  const [details, setDetails] = useState<Details>([]);

  const router = useRouter();
  const { loadingRequest } = useRequest();

  const { id } = router.query;

  useEffect(() => {
    const getReservationWrapper = async () => {
      // idはnullの可能性があるため存在したら次の処理に進む
      if (!id) return;

      const response = await getReservation(Number(id));
      setDetails([
        {
          key: INN_NAME_IDENTIFIER_ENGLISH,
          label: INN_NAME_IDENTIFIER_JAPANESE,
          child: <NextLink href={`/inn/edit/${response.inn.id}`}>{response.inn.name}</NextLink>,
        },
        {
          key: RESERVATION_STATUS_IDENTIFIER_ENGLISH,
          label: RESERVATION_STATUS_IDENTIFIER_JAPANESE,
          child: response.status.name,
        },
        {
          key: RESERVATION_RESERVER_IDENTIFIER_ENGLISH,
          label: RESERVATION_RESERVER_IDENTIFIER_JAPANESE,
          child: <NextLink href={`/user/${response.reserver.id}`}>{response.reserver.name}</NextLink>,
        },
        {
          key: CHECK_IN_TIME_IDENTIFIER_ENGLISH,
          label: CHECK_IN_TIME_IDENTIFIER_JAPANESE,
          child: dayJs(response.checkInTime).format(YEAR_MONTH_DAY_HOUR_MINUTE_TIME_FORMAT),
        },
        {
          key: CHECK_OUT_TIME_IDENTIFIER_ENGLISH,
          label: CHECK_OUT_TIME_IDENTIFIER_JAPANESE,
          child: dayJs(response.checkOutTime).format(YEAR_MONTH_DAY_HOUR_MINUTE_TIME_FORMAT),
        },
        {
          key: GUEST_NUMBER_IDENTIFIER_ENGLISH,
          label: GUEST_NUMBER_IDENTIFIER_JAPANESE,
          child: `${response.guestNumber}人`,
        },
        {
          key: INN_FEE_IDENTIFIER_ENGLISH,
          label: INN_FEE_IDENTIFIER_JAPANESE,
          child: `${response.fee}円`,
        },
        {
          key: CHAT_IDENDIFIER_ENGLISH,
          label: CHAT_IDENDIFIER_JAPANESE,
          child: <NextLink href={`/message/${id}`}>{response.reserver.name}様とのチャット</NextLink>,
        },
      ]);
    };

    loadingRequest(getReservationWrapper(), '取得中です', '取得に成功しました', '取得に失敗しました');
  }, [id]);

  return <DetailPaper details={details} />;
};

export default ReservationDetailPaper;
