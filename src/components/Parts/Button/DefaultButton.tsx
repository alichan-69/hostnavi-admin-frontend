import { LoadingButton } from '@mui/lab';
import type { DefaultButtonProps } from '.';
import { classOverride } from '../../../utils/classoverride';

const DefaultButton = function render({
  label,
  type,
  loading = false,
  disabled = false,
  fullWidth = false,
  variant = 'contained',
  startIcon,
  endIcon,
  onClick,
  className,
}: DefaultButtonProps) {
  return (
    <LoadingButton
      className={classOverride(className, 'p-4')}
      fullWidth={fullWidth}
      variant={variant}
      type={type}
      loading={loading}
      startIcon={startIcon}
      endIcon={endIcon}
      disabled={disabled}
      onClick={onClick}
    >
      <span className="text-16 font-bold text-thirdly">{label}</span>
    </LoadingButton>
  );
};

export default DefaultButton;
