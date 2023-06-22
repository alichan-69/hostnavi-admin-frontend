import type { PropsWithChildren } from 'react';

const ErrorText = function render({ children }: PropsWithChildren) {
  return <p className="text-12 text-warning">{children}</p>;
};

export default ErrorText;
