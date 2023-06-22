import type { PropsWithChildren } from 'react';

const WideLayout = ({ title, children }: PropsWithChildren<{ title: string }>) => {
  return (
    <div className="mx-auto w-[1200px] py-24">
      <h1 className="mb-5 text-24 font-bold">{title}</h1>
      {children}
    </div>
  );
};

export default WideLayout;
