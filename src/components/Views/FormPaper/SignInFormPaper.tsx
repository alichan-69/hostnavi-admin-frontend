import { DefaultButton } from '../../Parts/Button';
import { TextFieldInputGroup, FileInputGroup, DateInputGroup } from '../../Templates/InputGroup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Paper } from '@mui/material';
import type { UserUserRequestParam } from '../../../type/requestParam/userUser';
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
  PHONE_NUMBER_IDENTIFIER_JAPANESE,
  PHONE_NUMBER_IDENTIFIER_ENGLISH,
  MAIL_IDENTIFIER_JAPANESE,
  MAIL_IDENTIFIER_ENGLISH,
  PASSWORD_IDENTIFIER_JAPANESE,
  PASSWORD_IDENTIFIER_ENGLISH,
  CREDIT_CARD_NUMBER_IDENTIFIER_JAPANESE,
  CREDIT_CARD_NUMBER_IDENTIFIER_ENGLISH,
  CREDIT_CARD_EXPIRATION_DATE_IDENTIFIER_JAPANESE,
  CREDIT_CARD_EXPIRATION_DATE_IDENTIFIER_ENGLISH,
  CREDIT_CARD_CVV_IDENTIFIER_JAPANESE,
  CREDIT_CARD_CVV_IDENTIFIER_ENGLISH,
  FACEBOOK_URL_IDENTIFIER_JAPANESE,
  FACEBOOK_URL_IDENTIFIER_ENGLISH,
  INSTAGRAM_URL_IDENTIFIER_JAPANESE,
  INSTAGRAM_URL_IDENTIFIER_ENGLISH,
  TWITTER_URL_IDENTIFIER_JAPANESE,
  TWITTER_URL_IDENTIFIER_ENGLISH,
} from '../../../const/user';
import {
  yupString,
  yupNotRequiredString,
  yupStringValidatedByMinAndMax,
  yupStringValidatedByDesignatedNumber,
  yupNotRequiredUrl,
  validateImage,
  validateFutureDate,
} from '../../../utils/validation';
import { useRequest } from '../../../hooks/api';
import { createUser, updateUser, createUserImage, login } from '../../../utils/api/userUser';
import { useState, useRef, useEffect } from 'react';
import type AvatarEditor from 'react-avatar-editor';
import type { ChangeEvent } from 'react';
import type { UserCreditCardRequestParam } from '../../../type/requestParam/userCreditCard';
import type { UserImageRequestParam } from '../../../type/requestParam/userImage';
import { NextLink } from '../../Parts/Link';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { resizeCanvas } from '../../../utils/image';
import { CURRENT_DATE } from '../../../const/date';

type IFormInput = {
  userName: UserUserRequestParam['name'];
  userDescription: UserUserRequestParam['description'];
  userImage: UserImageRequestParam['image'] | null;
  userAddress: UserUserRequestParam['address'];
  occupation: UserUserRequestParam['occupation'];
  phoneNumber: UserUserRequestParam['phoneNumber'];
  mail: UserUserRequestParam['mail'];
  password: UserUserRequestParam['password'];
  facebookUrl: UserUserRequestParam['facebookUrl'];
  instagramUrl: UserUserRequestParam['instagramUrl'];
  twitterUrl: UserUserRequestParam['twitterUrl'];
  cardNumber: UserCreditCardRequestParam['cardNumber'];
  expirationDate: UserCreditCardRequestParam['expirationDate'] | null;
  cvv: UserCreditCardRequestParam['cvv'];
};

const SCHEMA = yup.object().shape({
  userName: yupString(USER_NAME_IDENTIFIER_JAPANESE, 100),
  userDescription: yupNotRequiredString(USER_DESCRIPTION_IDENTIFIER_JAPANESE, 100),
  userAddress: yupString(USER_ADDRESS_IDENTIFIER_JAPANESE, 100),
  occupation: yupNotRequiredString(OCCUPATION_IDENTIFIER_JAPANESE, 100),
  phoneNumber: yupString(PHONE_NUMBER_IDENTIFIER_JAPANESE, 100),
  mail: yupString(MAIL_IDENTIFIER_JAPANESE, 100),
  password: yupStringValidatedByMinAndMax(PASSWORD_IDENTIFIER_JAPANESE, 10, 100),
  facebookUrl: yupNotRequiredUrl(FACEBOOK_URL_IDENTIFIER_JAPANESE),
  instagramUrl: yupNotRequiredUrl(INSTAGRAM_URL_IDENTIFIER_JAPANESE),
  twitterUrl: yupNotRequiredUrl(TWITTER_URL_IDENTIFIER_JAPANESE),
  cardNumber: yupStringValidatedByMinAndMax(CREDIT_CARD_NUMBER_IDENTIFIER_JAPANESE, 14, 16),
  cvv: yupStringValidatedByDesignatedNumber(CREDIT_CARD_CVV_IDENTIFIER_JAPANESE, 3),
});

export const SignInFormPaper = () => {
  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState<File>();
  const [date, setDate] = useState(CURRENT_DATE);

  const { loadingRequest } = useRequest();
  const router = useRouter();

  const editorRef = useRef<AvatarEditor>(null);

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(SCHEMA),
    criteriaMode: 'all',
    shouldFocusError: true,
    defaultValues: {
      userName: '',
      userDescription: '',
      userAddress: '',
      occupation: '',
      phoneNumber: '',
      mail: '',
      password: '',
      facebookUrl: '',
      instagramUrl: '',
      twitterUrl: '',
      cardNumber: '',
      expirationDate: null,
      cvv: '',
    },
  });

  const handleChangeInputFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null && event.target.files[0]) {
      const inputFile = event.target.files[0];

      // ファイルのバリデーション処理
      const errorMessage = validateImage(inputFile);
      if (errorMessage) {
        setError(USER_IMAGE_IDENTIFIER_ENGLISH, { message: errorMessage });
        return;
      }

      setImageFile(inputFile);
      setImage(URL.createObjectURL(inputFile));
    }
  };

  const handleDeleteInputFile = () => {
    setImageFile(undefined);
    setImage('');
  };

  const handleChangeDate = (value: Date | null) => {
    // 日付のバリデーション処理
    const errorMessage = validateFutureDate(value);

    if (errorMessage) {
      setError(CREDIT_CARD_EXPIRATION_DATE_IDENTIFIER_ENGLISH, { message: errorMessage });
      return;
    }

    setDate(value as Date);
  };

  const createUserWrapper = async (data: IFormInput) => {
    try {
      // ユーザーの登録
      const response = await createUser({
        name: data.userName,
        description: data.userDescription || null,
        address: data.userAddress,
        occupation: data.occupation || null,
        phoneNumber: data.phoneNumber,
        mail: data.mail,
        password: data.password,
        creditCard: {
          cardNumber: data.cardNumber,
          expirationDate: date,
          cvv: data.cvv,
        },
        facebookUrl: data.facebookUrl || null,
        instagramUrl: data.instagramUrl || null,
        twitterUrl: data.twitterUrl || null,
      });

      const createdUserId = response.id;

      // ユーザーの画像の登録
      let imageResponse = null;
      if (editorRef.current && imageFile) {
        // トリミングした画像のcanvasを指定した幅と高さでリサイズする
        const canvas = resizeCanvas(editorRef.current.getImage(), 500, 500);

        // canvasオブジェクトからfileオブジェクトを作成する
        const result = await fetch(canvas.toDataURL());
        const blob = await result.blob();
        const newFile = new File([blob], imageFile.name, { type: imageFile.type });

        // 作成したfileオブジェクトminioに登録する処理
        const formData = new FormData();
        formData.append('image', newFile);
        imageResponse = await createUserImage(createdUserId, formData);
      } else {
        throw new Error();
      }

      // ユーザーの更新
      await updateUser(createdUserId, {
        imageUrl: imageResponse.url,
        name: data.userName,
        description: data.userDescription,
        address: data.userAddress,
        occupation: data.occupation,
        phoneNumber: data.phoneNumber,
        mail: data.mail,
        password: data.password,
        creditCard: null,
        facebookUrl: data.facebookUrl,
        instagramUrl: data.instagramUrl,
        twitterUrl: data.twitterUrl,
      });

      // ユーザー登録成功後の処理
      // ログインしてtokenをCookieに保存
      const token = await login({
        mail: data.mail,
        password: data.password,
      });
      Cookies.set('X-AUTH-TOKEN', token || '');

      // トップ画面に遷移
      router.push('/');
    } catch {
      throw new Error();
    }
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    // react-hook-formで管理している以外のformでエラーが発生していたら設定して表示する処理
    if (Object.keys(errors).length) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Object.keys(errors).map((error: keyof IFormInput) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setError(error, errors[error]);
      });
      return;
    }

    loadingRequest(createUserWrapper(data), '登録中', '登録完了', '登録中にエラーが発生しました');
  };

  useEffect(() => {
    // 画像のバリデーション処理
    const errorMessage = validateImage(imageFile);
    if (errorMessage) {
      setError(USER_IMAGE_IDENTIFIER_ENGLISH, { message: errorMessage });
      return;
    } else {
      clearErrors(USER_IMAGE_IDENTIFIER_ENGLISH);
    }
  }, [imageFile]);

  return (
    <>
      <Paper className="p-5">
        <form className="children:mb-5" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Controller
            control={control}
            name={USER_NAME_IDENTIFIER_ENGLISH}
            render={({ field: { ref, value, onChange } }) => (
              <TextFieldInputGroup
                inputRef={ref}
                isRequired={true}
                name={USER_NAME_IDENTIFIER_ENGLISH}
                label={USER_NAME_IDENTIFIER_JAPANESE}
                value={value}
                fullWidth={true}
                errors={errors[USER_NAME_IDENTIFIER_ENGLISH]}
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name={USER_DESCRIPTION_IDENTIFIER_ENGLISH}
            render={({ field: { ref, value, onChange } }) => (
              <TextFieldInputGroup
                inputRef={ref}
                name={USER_DESCRIPTION_IDENTIFIER_ENGLISH}
                label={USER_DESCRIPTION_IDENTIFIER_JAPANESE}
                value={value || ''}
                fullWidth={true}
                errors={errors[USER_DESCRIPTION_IDENTIFIER_ENGLISH]}
                onChange={onChange}
              />
            )}
          />
          <FileInputGroup
            name={USER_IMAGE_IDENTIFIER_ENGLISH}
            label={USER_IMAGE_IDENTIFIER_JAPANESE}
            onChangeInput={handleChangeInputFile}
            onClickAvatorEditorDeleteButton={handleDeleteInputFile}
            avatarEditorImage={image}
            avatarEditorRef={editorRef}
            avatarEditorErrors={errors[USER_IMAGE_IDENTIFIER_ENGLISH]}
            isRequired={true}
          />
          <Controller
            control={control}
            name={USER_ADDRESS_IDENTIFIER_ENGLISH}
            render={({ field: { ref, value, onChange } }) => (
              <TextFieldInputGroup
                inputRef={ref}
                isRequired={true}
                name={USER_ADDRESS_IDENTIFIER_ENGLISH}
                label={USER_ADDRESS_IDENTIFIER_JAPANESE}
                value={value}
                fullWidth={true}
                errors={errors[USER_ADDRESS_IDENTIFIER_ENGLISH]}
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name={OCCUPATION_IDENTIFIER_ENGLISH}
            render={({ field: { ref, value, onChange } }) => (
              <TextFieldInputGroup
                inputRef={ref}
                name={OCCUPATION_IDENTIFIER_ENGLISH}
                label={OCCUPATION_IDENTIFIER_JAPANESE}
                value={value || ''}
                fullWidth={true}
                errors={errors[OCCUPATION_IDENTIFIER_ENGLISH]}
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name={PHONE_NUMBER_IDENTIFIER_ENGLISH}
            render={({ field: { ref, value, onChange } }) => (
              <TextFieldInputGroup
                inputRef={ref}
                isRequired={true}
                name={PHONE_NUMBER_IDENTIFIER_ENGLISH}
                label={PHONE_NUMBER_IDENTIFIER_JAPANESE}
                value={value}
                fullWidth={true}
                errors={errors[PHONE_NUMBER_IDENTIFIER_ENGLISH]}
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name={MAIL_IDENTIFIER_ENGLISH}
            render={({ field: { ref, value, onChange } }) => (
              <TextFieldInputGroup
                inputRef={ref}
                isRequired={true}
                name={MAIL_IDENTIFIER_ENGLISH}
                label={MAIL_IDENTIFIER_JAPANESE}
                value={value}
                fullWidth={true}
                errors={errors[MAIL_IDENTIFIER_ENGLISH]}
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name={PASSWORD_IDENTIFIER_ENGLISH}
            render={({ field: { ref, value, onChange } }) => (
              <TextFieldInputGroup
                inputRef={ref}
                isRequired={true}
                name={PASSWORD_IDENTIFIER_ENGLISH}
                label={PASSWORD_IDENTIFIER_JAPANESE}
                value={value}
                fullWidth={true}
                errors={errors[PASSWORD_IDENTIFIER_ENGLISH]}
                type="password"
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name={FACEBOOK_URL_IDENTIFIER_ENGLISH}
            render={({ field: { ref, value, onChange } }) => (
              <TextFieldInputGroup
                inputRef={ref}
                name={FACEBOOK_URL_IDENTIFIER_ENGLISH}
                label={FACEBOOK_URL_IDENTIFIER_JAPANESE}
                value={value || ''}
                fullWidth={true}
                errors={errors[FACEBOOK_URL_IDENTIFIER_ENGLISH]}
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name={INSTAGRAM_URL_IDENTIFIER_ENGLISH}
            render={({ field: { ref, value, onChange } }) => (
              <TextFieldInputGroup
                inputRef={ref}
                name={INSTAGRAM_URL_IDENTIFIER_ENGLISH}
                label={INSTAGRAM_URL_IDENTIFIER_JAPANESE}
                value={value || ''}
                fullWidth={true}
                errors={errors[INSTAGRAM_URL_IDENTIFIER_ENGLISH]}
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name={TWITTER_URL_IDENTIFIER_ENGLISH}
            render={({ field: { ref, value, onChange } }) => (
              <TextFieldInputGroup
                inputRef={ref}
                name={TWITTER_URL_IDENTIFIER_ENGLISH}
                label={TWITTER_URL_IDENTIFIER_JAPANESE}
                value={value || ''}
                fullWidth={true}
                errors={errors[TWITTER_URL_IDENTIFIER_ENGLISH]}
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name={CREDIT_CARD_NUMBER_IDENTIFIER_ENGLISH}
            render={({ field: { ref, value, onChange } }) => (
              <TextFieldInputGroup
                inputRef={ref}
                isRequired={true}
                name={CREDIT_CARD_NUMBER_IDENTIFIER_ENGLISH}
                label={CREDIT_CARD_NUMBER_IDENTIFIER_JAPANESE}
                value={value}
                fullWidth={true}
                errors={errors[CREDIT_CARD_NUMBER_IDENTIFIER_ENGLISH]}
                onChange={onChange}
              />
            )}
          />
          <DateInputGroup
            isRequired={true}
            name={CREDIT_CARD_EXPIRATION_DATE_IDENTIFIER_ENGLISH}
            label={CREDIT_CARD_EXPIRATION_DATE_IDENTIFIER_JAPANESE}
            value={date}
            disablePast={true}
            errors={errors[CREDIT_CARD_EXPIRATION_DATE_IDENTIFIER_ENGLISH]}
            onChange={handleChangeDate}
          />
          <Controller
            control={control}
            name={CREDIT_CARD_CVV_IDENTIFIER_ENGLISH}
            render={({ field: { ref, value, onChange } }) => (
              <TextFieldInputGroup
                inputRef={ref}
                isRequired={true}
                name={CREDIT_CARD_CVV_IDENTIFIER_ENGLISH}
                label={CREDIT_CARD_CVV_IDENTIFIER_JAPANESE}
                value={value}
                fullWidth={true}
                errors={errors[CREDIT_CARD_CVV_IDENTIFIER_ENGLISH]}
                onChange={onChange}
              />
            )}
          />
          <DefaultButton fullWidth={true} label="登録" type="submit" />
          <NextLink href="/auth/login">ユーザー登録済みの方はこちら </NextLink>
        </form>
      </Paper>
    </>
  );
};

export default SignInFormPaper;
