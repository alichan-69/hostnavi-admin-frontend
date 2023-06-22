import { Box } from '@mui/material';
import type { PropsWithChildren } from 'react';
import type { DefaultComponentProps } from '../types';
import { classOverride } from '../../utils/classoverride';

const DashedBox = function render({
  children,
  component,
  className,
}: PropsWithChildren<
  {
    component?: any;
    className?: string;
  } & DefaultComponentProps
>) {
  return (
    <Box className={classOverride(className)} component={component} sx={{ p: 2, border: '1px dashed grey', height: 'inherit' }}>
      {children}
    </Box>
  );
};

export default DashedBox;
