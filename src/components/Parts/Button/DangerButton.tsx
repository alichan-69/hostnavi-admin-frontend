import type { DefaultButtonProps } from '.';
import { LoadingButton } from '@mui/lab';
import { classOverride } from '../../../utils/classoverride';

const DangerButton = function render({
  label,
  type,
  loading = false,
  disabled = false,
  fullWidth = false,
  variant = 'contained',
  startIcon,
  endIcon,
  onClick,
  href = '',
  className,
}: DefaultButtonProps) {
  return (
    <LoadingButton
      className={classOverride(className, 'p-4')}
      color="warning"
      fullWidth={fullWidth}
      variant={variant}
      type={type}
      loading={loading}
      startIcon={startIcon}
      endIcon={endIcon}
      disabled={disabled}
      href={href}
      onClick={onClick}
    >
      <span className="text-16 font-bold text-thirdly">{label}</span>
    </LoadingButton>
  );
};

export default DangerButton;
