import clsx, { ClassValue } from 'clsx';
import { overrideTailwindClasses } from 'tailwind-override';

/** tailwindcssで後から設定したクラスを上書きする処理 */
export const classOverride = (...classNames: ClassValue[]) => {
  return overrideTailwindClasses(clsx(...classNames.reverse()));
};
