import { InputAdornment, TextField, InputBaseComponentProps } from '@mui/material';
import type { ChangeEventHandler } from 'react';
import type { FieldError } from 'react-hook-form';
import type { DefaultComponentProps } from '../types';
import { classOverride } from '../../utils/classoverride';

export type TextFieldOnChange = ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

export type DefaultTextFieldProps = {
  inputRef?: React.Ref<HTMLInputElement>;
  name?: string;
  value?: string | number;
  placeholder?: string;
  type?: string;
  fullWidth?: boolean;
  multiline?: boolean;
  rows?: number;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  inputProps?: InputBaseComponentProps;
  defaultValue?: unknown;
  disabled?: boolean;
  errors?: FieldError | undefined;
  onChange: TextFieldOnChange;
} & DefaultComponentProps;

const DefaultTextField = function render({
  className = '',
  inputRef = null,
  name = '',
  value,
  type = 'text',
  placeholder = '',
  fullWidth = false,
  multiline = false,
  rows = 1,
  startAdornment,
  endAdornment,
  inputProps = {},
  defaultValue,
  disabled = false,
  errors,
  onChange,
}: DefaultTextFieldProps) {
  return (
    <TextField
      className={classOverride(className, 'bg-thirdly')}
      inputRef={inputRef}
      name={name}
      value={value}
      placeholder={placeholder}
      fullWidth={fullWidth}
      type={type}
      variant="outlined"
      multiline={multiline}
      rows={rows}
      InputProps={{
        startAdornment: startAdornment && <InputAdornment position="start">{startAdornment}</InputAdornment>,
        endAdornment: endAdornment && <InputAdornment position="end">{endAdornment}</InputAdornment>,
      }}
      inputProps={inputProps}
      defaultValue={defaultValue}
      disabled={disabled}
      error={Boolean(errors)}
      onChange={onChange}
    />
  );
};

export default DefaultTextField;
