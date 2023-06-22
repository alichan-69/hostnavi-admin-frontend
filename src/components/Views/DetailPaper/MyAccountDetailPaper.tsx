import DetailPaper from '../../../components/Templates/DetailPaper';
import {
  USER_IMAGE_IDENTIFIER_JAPANESE,
  USER_IMAGE_IDENTIFIER_ENGLISH,
  USER_NAME_IDENTIFIER_JAPANESE,
  USER_NAME_IDENTIFIER_ENGLISH,
  USER_DESCRIPTION_IDENTIFIER_JAPANESE,
  USER_DESCRIPTION_IDENTIFIER_ENGLISH,
  USER_ADDRESS_IDENTIFIER_JAPANESE,
  USER_ADDRESS_IDENTIFIER_ENGLISH,
  OCCUPATION_IDENTIFIER_JAPANESE,
  OCCUPATION_IDENTIFIER_ENGLISH,
  CREATE_USER_TIME_IDENTIFIER_JAPANESE,
  CREATE_USER_TIME_IDENTIFIER_ENGLISH,
  REVIEW_NUMBER_IDENTIFIER_JAPANESE,
  REVIEW_NUMBER_IDENTIFIER_ENGLISH,
  PHONE_NUMBER_IDENTIFIER_JAPANESE,
  PHONE_NUMBER_IDENTIFIER_ENGLISH,
  MAIL_IDENTIFIER_JAPANESE,
  MAIL_IDENTIFIER_ENGLISH,
  CREDIT_CARD_CVV_IDENTIFIER_JAPANESE,
  CREDIT_CARD_NUMBER_IDENTIFIER_ENGLISH,
  CREDIT_CARD_EXPIRATION_DATE_IDENTIFIER_JAPANESE,
  CREDIT_CARD_EXPIRATION_DATE_IDENTIFIER_ENGLISH,
  CREDIT_CARD_NUMBER_IDENTIFIER_JAPANESE,
  CREDIT_CARD_CVV_IDENTIFIER_ENGLISH,
  FACEBOOK_URL_IDENTIFIER_ENGLISH,
  FACEBOOK_URL_IDENTIFIER_JAPANESE,
  INSTAGRAM_URL_IDENTIFIER_ENGLISH,
  INSTAGRAM_URL_IDENTIFIER_JAPANESE,
  TWITTER_URL_IDENTIFIER_ENGLISH,
  TWITTER_URL_IDENTIFIER_JAPANESE,
  USER_PAGE_IDENTIFIER_ENGLISH,
  USER_PAGE_IDENTIFIER_JAPANESE,
} from '../../../const/user';
import { AnchorLink } from '../../Parts/Link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import type { Details } from '../../../components/Templates/DetailPaper';
import { getUser } from '../../../utils/api/userUser';
import { dayJs } from '../../../utils/day';
import { YEAR_MONTH_DAY_HOUR_MINUTE_TIME_FORMAT, YEAR_MONTH_DAY_TIME_FORMAT } from '../../../const/date';
import { getAllReviews } from '../../../utils/api/reservationReview';
import { useRequest } from '../../../hooks/api';
import { useAuth } from '../../../hooks/auth';

const MyAccountDetailPaper = () => {
  const [details, setDetails] = useState<Details>([]);
  const { loadingRequest } = useRequest();

  const { userId } = useAuth();

  useEffect(() => {
    // userIdはnullの場合があるので、存在したら以降処理に進む
    if (!userId) return;

    const getUserWrapper = async () => {
      const userResponse = await getUser(Number(userId));
      const reviewResponse = await getAllReviews(undefined, Number(userId));

      setDetails([
        {
          key: USER_IMAGE_IDENTIFIER_ENGLISH,
          label: USER_IMAGE_IDENTIFIER_JAPANESE,
          child: <Image width={200} height={200} src={userResponse.imageUrl} alt="プロフィール画像" />,
        },
        {
          key: USER_NAME_IDENTIFIER_ENGLISH,
          label: USER_NAME_IDENTIFIER_JAPANESE,
          child: userResponse.name,
        },
        {
          key: USER_DESCRIPTION_IDENTIFIER_ENGLISH,
          label: USER_DESCRIPTION_IDENTIFIER_JAPANESE,
          child: userResponse.description,
        },
        {
          key: USER_ADDRESS_IDENTIFIER_ENGLISH,
          label: USER_ADDRESS_IDENTIFIER_JAPANESE,
          child: userResponse.address,
        },
        {
          key: OCCUPATION_IDENTIFIER_ENGLISH,
          label: OCCUPATION_IDENTIFIER_JAPANESE,
          child: userResponse.occupation,
        },
        {
          key: REVIEW_NUMBER_IDENTIFIER_ENGLISH,
          label: REVIEW_NUMBER_IDENTIFIER_JAPANESE,
          child: `${reviewResponse.length}件`,
        },
        {
          key: PHONE_NUMBER_IDENTIFIER_ENGLISH,
          label: PHONE_NUMBER_IDENTIFIER_JAPANESE,
          child: userResponse.phoneNumber,
        },
        {
          key: MAIL_IDENTIFIER_ENGLISH,
          label: MAIL_IDENTIFIER_JAPANESE,
          child: userResponse.mail,
        },
        {
          key: CREDIT_CARD_NUMBER_IDENTIFIER_ENGLISH,
          label: CREDIT_CARD_NUMBER_IDENTIFIER_JAPANESE,
          child: userResponse.creditCard.cardNumber,
        },
        {
          key: CREDIT_CARD_EXPIRATION_DATE_IDENTIFIER_ENGLISH,
          label: CREDIT_CARD_EXPIRATION_DATE_IDENTIFIER_JAPANESE,
          child: dayJs(userResponse.creditCard.expirationDate).format(YEAR_MONTH_DAY_TIME_FORMAT),
        },
        {
          key: CREDIT_CARD_CVV_IDENTIFIER_ENGLISH,
          label: CREDIT_CARD_CVV_IDENTIFIER_JAPANESE,
          child: dayJs(userResponse.creditCard.expirationDate).format(YEAR_MONTH_DAY_TIME_FORMAT),
        },
        {
          key: FACEBOOK_URL_IDENTIFIER_ENGLISH,
          label: FACEBOOK_URL_IDENTIFIER_JAPANESE,
          child: <AnchorLink href={userResponse.facebookUrl}>Facebook</AnchorLink>,
        },
        {
          key: INSTAGRAM_URL_IDENTIFIER_ENGLISH,
          label: INSTAGRAM_URL_IDENTIFIER_JAPANESE,
          child: <AnchorLink href={userResponse.instagramUrl}>Instagram</AnchorLink>,
        },
        {
          key: TWITTER_URL_IDENTIFIER_ENGLISH,
          label: TWITTER_URL_IDENTIFIER_JAPANESE,
          child: <AnchorLink href={userResponse.twitterUrl}>Twitter</AnchorLink>,
        },
        {
          key: USER_PAGE_IDENTIFIER_ENGLISH,
          label: USER_PAGE_IDENTIFIER_JAPANESE,
          child: <AnchorLink href={`${process.env['CUSTOMER_WEB_URL']}`}>{userResponse.name}</AnchorLink>,
        },
        {
          key: CREATE_USER_TIME_IDENTIFIER_ENGLISH,
          label: CREATE_USER_TIME_IDENTIFIER_JAPANESE,
          child: dayJs(userResponse.createTime).format(YEAR_MONTH_DAY_HOUR_MINUTE_TIME_FORMAT),
        },
      ]);
    };

    loadingRequest(getUserWrapper(), '取得中です', '取得に成功しました', '取得に失敗しました');
  }, [userId]);

  return <DetailPaper details={details} />;
};

export default MyAccountDetailPaper;
