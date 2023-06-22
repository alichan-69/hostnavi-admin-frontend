import type { ImageProps } from 'next/image';
import type { DefaultComponentProps } from '../types';

export declare type DefaultImageProps = {
  src: string;
  alt: string;
  width: ImageProps['width'];
  height: ImageProps['height'];
} & DefaultComponentProps;
