import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useState, useMemo } from 'react';
import { DefaultButton, DangerButton } from '../Parts/Button';
import { useRequest } from '../../hooks/api';
import ErrorText from '../Parts/ErrorText';
import type { TextFieldOnChange } from '../Parts/DefaultTextField';

const DeleteDialog = function render({
  label,
  onDelete,
  dangerButtonClassName = '',
  dangerButtonFullWidth = false,
}: {
  label: string;
  onDelete: () => Promise<unknown>;
  dangerButtonClassName?: string;
  dangerButtonFullWidth?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [buttonLoading, setButtonLoding] = useState(false);
  const [confirmText, setConfirmText] = useState('');

  const isConfirmed = useMemo(() => {
    return confirmText === '削除';
  }, [confirmText]);

  const { loadingRequest } = useRequest();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChangeConfirmText: TextFieldOnChange = (event) => {
    setConfirmText(event.target.value);
  };

  const onClickDeleteButton = async () => {
    if (!isConfirmed) return;
    setButtonLoding(true);
    await loadingRequest(onDelete(), '削除中', ' 削除完了', '削除中にエラーが発生しました');
    setButtonLoding(false);
  };

  return (
    <>
      <DangerButton className={dangerButtonClassName} fullWidth={dangerButtonFullWidth} label={label} onClick={handleOpen} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          本当に削除しますか？
          <br />
          削除する場合は削除と入力してください。
        </DialogTitle>
        <DialogContent>
          <div className="children:mb-1">
            <TextField
              className="bg-thirdly"
              placeholder="削除"
              value={confirmText}
              disabled={buttonLoading}
              fullWidth
              onChange={onChangeConfirmText}
            />
            <ErrorText>{isConfirmed ? '' : '削除と入力してください。'}</ErrorText>
            <DialogActions>
              <DefaultButton fullWidth={true} label="削除" onClick={onClickDeleteButton} />
            </DialogActions>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteDialog;
