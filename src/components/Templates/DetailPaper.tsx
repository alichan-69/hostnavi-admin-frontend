import { Paper } from '@mui/material';
import type { ReactNode } from 'react';

export declare type Details = {
  key: string;
  label: string;
  child: ReactNode | string;
}[];

const DetailPaper = function render({ details }: { details: Details }) {
  return (
    <Paper className="p-5 children:mb-5">
      {details.map((detail) => (
        <div key={`detail-${detail.key}`}>
          <div className="text-20 font-bold">{detail.label}</div>
          <hr className="mb-2 border-2 text-primary" />
          <p>{detail.child}</p>
        </div>
      ))}
    </Paper>
  );
};

export default DetailPaper;
