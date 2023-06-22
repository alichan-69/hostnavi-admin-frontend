import { Modal } from '@mui/material';
import type { PropsWithChildren } from 'react';

const DefaultModal = function render({
  children,
  open,
  handleClose,
}: PropsWithChildren<{
  open: boolean;
  handleClose: () => void;
}>) {
  return (
    <Modal className="flex items-center justify-center" open={open} onClose={handleClose} aria-labelledby="default-modal">
      <div className="bg-thirdly p-24">{children}</div>
    </Modal>
  );
};

export default DefaultModal;
