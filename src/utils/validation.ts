import * as yup from 'yup';
import { CURRENT_DATE } from '../const/date';

export const yupString = (label: string, max: number) =>
  yup
    .string()
    .required(`${label}を入力してください`)
    .typeError('文字列を入力してください')
    .max(max, `${label}は${max}文字以下にしてください`);
export const yupNotRequiredString = (label: string, max: number) =>
  yup.string().typeError('文字列を入力してください').max(max, `${label}は${max}文字以下にしてください`);
export const yupStringValidatedByMinAndMax = (label: string, min: number, max: number) =>
  yup
    .string()
    .required(`${label}を入力してください`)
    .typeError('文字列を入力してください')
    .min(min, `${label}は${min}文字以上にしてください`)
    .max(max, `${label}は${max}文字以下にしてください`);
export const yupStringValidatedByDesignatedNumber = (label: string, designatedNumber: number) =>
  yup
    .string()
    .required(`${label}を入力してください`)
    .typeError('文字列を入力してください')
    .min(designatedNumber, `${label}は${designatedNumber}文字で入力してください`)
    .max(designatedNumber, `${label}は${designatedNumber}で入力してください`);
export const yupUrl = (label: string) =>
  yup
    .string()
    .required(`${label}を入力してください`)
    .typeError('文字列を入力してください')
    .min(1, `${label}は1文字以上にしてください`)
    .max(500, `${label}は500文字以下にしてください`)
    .url('URLの形式で入力してください');
export const yupNotRequiredUrl = (label: string) =>
  yup.string().typeError('文字列を入力してください').max(500, `${label}は500文字以下にしてください`).url('URLの形式で入力してください');
export const yupMail = (label: string) =>
  yup
    .string()
    .required(`${label}を入力してください`)
    .typeError('文字列を入力してください')
    .min(1, `${label}は1文字以上にしてください`)
    .max(100, `${label}は100文字以下にしてください`)
    .email('メールアドレスの形式で入力してください');
export const yupNumber = (label: string, max: number, unit: string) =>
  yup
    .number()
    .required(`${label}を入力してください`)
    .typeError('数字を入力してください')
    .integer('整数を入力してください')
    .max(max, `${max}${unit}以下を入力してください`);
export const validateImage = (value: File | undefined): string => {
  if (!value) return 'ファイルを入力してください';
  if (!['image/jpg', 'image/jpeg', 'image/png'].includes(value.type)) return 'サポートされていないファイルフォーマットです';
  return '';
};
export const validateImages = (value: File[]): string => {
  if (value.length > 10 || value.length <= 0) return '画像を1個以上10個以下で入力してください';
  return '';
};
export const validateFutureDate = (value: Date | null) => {
  if (!value) return '日付を入力してください';
  if (CURRENT_DATE > value) return '未来の日付を入力してください';
  return '';
};
