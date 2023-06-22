import type { PropsWithChildren } from 'react';

const NarrowLayout = ({ title, children }: PropsWithChildren<{ title: string }>) => {
  return (
    <>
      <div className="mx-auto w-[800px] py-24">
        <h1 className="mb-5 text-24 font-bold">{title}</h1>
        {children}
      </div>
    </>
  );
};

export default NarrowLayout;
