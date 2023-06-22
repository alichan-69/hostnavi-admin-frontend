import dayjs, { locale } from 'dayjs';
import ja from 'dayjs/locale/ja';

locale({
  ...ja,
});

export const dayJs = (time?: dayjs.ConfigType) => dayjs(time || new Date(2023, 5, 13, 12));
