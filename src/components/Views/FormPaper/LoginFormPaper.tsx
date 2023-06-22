import { DefaultButton } from '../../Parts/Button';
import { TextFieldInputGroup } from '../../Templates/InputGroup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Paper } from '@mui/material';
import type { AuthUserRequestParam } from '../../../type/requestParam/userUser';
import {
  MAIL_IDENTIFIER_JAPANESE,
  MAIL_IDENTIFIER_ENGLISH,
  PASSWORD_IDENTIFIER_JAPANESE,
  PASSWORD_IDENTIFIER_ENGLISH,
} from '../../../const/user';
import { yupString, yupStringValidatedByMinAndMax } from '../../../utils/validation';
import { useRequest } from '../../../hooks/api';
import { login } from '../../../utils/api/userUser';
import Cookies from 'js-cookie';
import { NextLink } from '../../Parts/Link';
import { useRouter } from 'next/router';

type IFormInput = {
  mail: AuthUserRequestParam['mail'];
  password: AuthUserRequestParam['password'];
};

const SCHEMA = yup.object().shape({
  mail: yupString(MAIL_IDENTIFIER_JAPANESE, 100),
  password: yupStringValidatedByMinAndMax(PASSWORD_IDENTIFIER_JAPANESE, 10, 100),
});

export const LoginFormPaper = () => {
  const { loadingRequest } = useRequest();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(SCHEMA),
    criteriaMode: 'all',
    shouldFocusError: true,
    defaultValues: {
      mail: '',
      password: '',
    },
  });

  const loginWrapper = async (data: IFormInput) => {
    try {
      const response = await login({
        mail: data.mail,
        password: data.password,
      });

      // ログイン成功後の処理
      // tokenをCookieに保存
      Cookies.set('X-AUTH-TOKEN', response || '');

      // トップ画面に遷移
      router.replace('/');
    } catch {
      throw new Error();
    }
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    loadingRequest(loginWrapper(data), 'ログイン中', 'ログイン完了', 'ログイン中にエラーが発生しました');
  };

  return (
    <>
      <Paper className="p-5">
        <form className="children:mb-5" onSubmit={handleSubmit(onSubmit)} noValidate>
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
                onChange={onChange}
              />
            )}
          />
          <DefaultButton fullWidth={true} label="ログイン" type="submit" />
          <NextLink href="/auth/signIn">ユーザー登録がまだの方はこちら </NextLink>
        </form>
      </Paper>
    </>
  );
};

export default LoginFormPaper;
