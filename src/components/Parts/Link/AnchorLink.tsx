import type { DefaultLinkProps } from '.';

const AnchorLink = function render({ href, children }: DefaultLinkProps) {
  return (
    <a href={href} className="font-bold text-secondary underline">
      {children}
    </a>
  );
};

export default AnchorLink;
