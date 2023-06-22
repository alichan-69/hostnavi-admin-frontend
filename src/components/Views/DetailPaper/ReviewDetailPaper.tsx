import DetailPaper from '../../Templates/DetailPaper';
import {
  REVIEWER_IDENTIFIER_JAPANESE,
  REVIEWER_IDENTIFIER_ENGLISH,
  REVIEW_IDENTIFIER_JAPANESE,
  REVIEW_IDENTIFIER_ENGLISH,
  CLEAN_SCORE_IDENTIFIER_JAPANESE,
  CLEAN_SCORE_IDENTIFIER_ENGLISH,
  SERVICE_SCORE_IDENTIFIER_JAPANESE,
  SERVICE_SCORE_IDENTIFIER_ENGLISH,
  LOCATION_SCORE_IDENTIFIER_JAPANESE,
  LOCATION_SCORE_IDENTIFIER_ENGLISH,
  FACILITY_SCORE_IDENTIFIER_JAPANESE,
  FACILITY_SCORE_IDENTIFIER_ENGLISH,
  FEE_SCORE_IDENTIFIER_JAPANESE,
  FEE_SCORE_IDENTIFIER_ENGLISH,
  CREATE_TIME_IDENTIFIER_JAPANESE,
  CREATE_TIME_IDENTIFIER_ENGLISH,
} from '../../../const/review';
import { INN_NAME_IDENTIFIER_JAPANESE, INN_NAME_IDENTIFIER_ENGLISH } from '../../../const/inn';
import { NextLink } from '../../Parts/Link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import type { Details } from '../../Templates/DetailPaper';
import { getReview } from '../../../utils/api/reservationReview';
import { dayJs } from '../../../utils/day';
import { YEAR_MONTH_DAY_HOUR_MINUTE_TIME_FORMAT } from '../../../const/date';
import { useRequest } from '../../../hooks/api';

const ReviewDetailPaper = () => {
  const [details, setDetails] = useState<Details>([]);

  const router = useRouter();
  const { loadingRequest } = useRequest();

  const { id } = router.query;

  useEffect(() => {
    const getReviewWrapper = async () => {
      const response = await getReview(Number(id));
      setDetails([
        {
          key: INN_NAME_IDENTIFIER_ENGLISH,
          label: INN_NAME_IDENTIFIER_JAPANESE,
          child: <NextLink href={`/inn/edit/${response.reservation.inn.id}`}>{response.reservation.inn.name}</NextLink>,
        },
        {
          key: REVIEWER_IDENTIFIER_ENGLISH,
          label: REVIEWER_IDENTIFIER_JAPANESE,
          child: <NextLink href={`/user/${response.reservation.reserver.id}`}>{response.reservation.reserver.name}</NextLink>,
        },
        {
          key: REVIEW_IDENTIFIER_ENGLISH,
          label: REVIEW_IDENTIFIER_JAPANESE,
          child: response.review,
        },
        {
          key: CLEAN_SCORE_IDENTIFIER_ENGLISH,
          label: CLEAN_SCORE_IDENTIFIER_JAPANESE,
          child: `${response.cleanScore}点`,
        },
        {
          key: SERVICE_SCORE_IDENTIFIER_ENGLISH,
          label: SERVICE_SCORE_IDENTIFIER_JAPANESE,
          child: `${response.serviceScore}点`,
        },
        {
          key: FACILITY_SCORE_IDENTIFIER_ENGLISH,
          label: FACILITY_SCORE_IDENTIFIER_JAPANESE,
          child: `${response.facilityScore}点`,
        },
        {
          key: LOCATION_SCORE_IDENTIFIER_ENGLISH,
          label: LOCATION_SCORE_IDENTIFIER_JAPANESE,
          child: `${response.locationScore}点`,
        },
        {
          key: FEE_SCORE_IDENTIFIER_ENGLISH,
          label: FEE_SCORE_IDENTIFIER_JAPANESE,
          child: `${response.feeScore}点`,
        },
        {
          key: CREATE_TIME_IDENTIFIER_ENGLISH,
          label: CREATE_TIME_IDENTIFIER_JAPANESE,
          child: dayJs(response.createTime).format(YEAR_MONTH_DAY_HOUR_MINUTE_TIME_FORMAT),
        },
      ]);
    };

    loadingRequest(getReviewWrapper(), '取得中です', '取得に成功しました', '取得に失敗しました');
  }, []);

  return <DetailPaper details={details} />;
};

export default ReviewDetailPaper;
