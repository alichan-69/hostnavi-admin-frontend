import { Backdrop, CircularProgress } from '@mui/material';

const DefaultBackDrop = function render({ open }: { open: boolean }) {
  return (
    <Backdrop
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={open}
    >
      <CircularProgress color="primary" />
    </Backdrop>
  );
};

export default DefaultBackDrop;
