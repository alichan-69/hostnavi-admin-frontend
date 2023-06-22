import type { FieldError, Merge, FieldErrorsImpl } from 'react-hook-form';
import ErrorText from './ErrorText';

const InputValidateError = function render({
  errors,
}: {
  errors: Merge<FieldError, (FieldError | undefined)[]> | undefined | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}) {
  return Boolean(errors) ? <ErrorText>{String(errors?.message)}</ErrorText> : <></>;
};

export default InputValidateError;
