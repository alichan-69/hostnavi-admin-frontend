import { LoadingButton } from '@mui/lab';
import type { DefaultButtonProps } from '.';
import { MouseEventHandler, useCallback } from 'react';
import { useRouter } from 'next/dist/client/router';
import { classOverride } from '../../../utils/classoverride';

const RouterButton = function render({
  label,
  type,
  href = '',
  isReplace,
  loading = false,
  disabled = false,
  fullWidth = false,
  variant = 'contained',
  startIcon,
  endIcon,
  className,
}: DefaultButtonProps) {
  const router = useRouter();

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      event.preventDefault();

      if (href.startsWith('http')) {
        window.open(href, '_blank');
      } else if (isReplace) {
        router.replace(href);
      } else {
        router.push(href);
      }
    },
    [href],
  );

  return (
    <LoadingButton
      className={classOverride(className, 'p-4')}
      fullWidth={fullWidth}
      variant={variant}
      type={type}
      href={href}
      loading={loading}
      startIcon={startIcon}
      endIcon={endIcon}
      disabled={disabled}
      onClick={handleClick}
    >
      <span className="text-16 font-bold text-thirdly">{label}</span>
    </LoadingButton>
  );
};

export default RouterButton;
