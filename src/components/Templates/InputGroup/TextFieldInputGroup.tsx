import InputLabel from '../../Parts/InputLabel';
import DefaultTextField, { DefaultTextFieldProps } from '../../Parts/DefaultTextField';
import InputValidateError from '../../Parts/InputValidateError';

const TextFieldInputGroup = function render({
  inputRef = null,
  name = '',
  value = '',
  type = 'text',
  placeholder = '',
  fullWidth = false,
  multiline = false,
  rows = 1,
  disabled = false,
  endAdornment,
  inputProps = {},
  errors,
  onChange,
  label,
  isRequired = false,
}: { label?: string; isRequired?: boolean } & DefaultTextFieldProps) {
  return (
    <div className="children:mb-1">
      {label && <InputLabel htmlFor={name} label={label} isRequired={isRequired} />}
      <DefaultTextField
        inputRef={inputRef}
        name={name}
        value={value}
        type={type}
        placeholder={placeholder}
        fullWidth={fullWidth}
        multiline={multiline}
        rows={rows}
        endAdornment={endAdornment}
        inputProps={inputProps}
        disabled={disabled}
        errors={errors}
        onChange={onChange}
      />
      {errors && <InputValidateError errors={errors} />}
    </div>
  );
};

export default TextFieldInputGroup;
