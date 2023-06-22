import type { DefaultLinkProps } from '.';
import Link from 'next/link';

const NextLink = function render({ href, children }: DefaultLinkProps) {
  return (
    <Link href={href}>
      <span className="cursor-pointer font-bold text-secondary underline">{children}</span>
    </Link>
  );
};

export default NextLink;
