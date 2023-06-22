import type { ReactNode } from 'react';
import type { DefaultComponentProps } from '../../types';
import type { UseFormHandleSubmit, FieldValues } from 'react-hook-form';

export declare type DefaultButtonProps = {
  label: string;
  type?: 'submit' | 'reset' | 'button';
  href?: string;
  isReplace?: boolean;
  component?: string;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  variant?: 'text' | 'outlined' | 'contained';
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  onClick?: () => void | Promise<any> | UseFormHandleSubmit<FieldValues>;
} & DefaultComponentProps;

export { default as DangerButton } from './DangerButton';
export { default as DefaultButton } from './DefaultButton';
export { default as RouterButton } from './RouterButton';
