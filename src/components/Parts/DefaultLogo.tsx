import Logo from '../../assets/logo/Logo.png';
import Image, { ImageProps } from 'next/image';
import type { DefaultComponentProps } from '../types';

const DefaultLogo = function render({
  width = 0,
  height = 0,
  className,
}: {
  width?: ImageProps['width'];
  height?: ImageProps['height'];
} & DefaultComponentProps) {
  return <Image src={Logo} alt="HostNaviロゴ" width={width} height={height} className={className} />;
};

export default DefaultLogo;
