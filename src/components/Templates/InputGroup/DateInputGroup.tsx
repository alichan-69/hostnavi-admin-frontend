import InputLabel from '../../Parts/InputLabel';
import InputValidateError from '../../Parts/InputValidateError';
import type { FieldError } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import ja from 'dayjs/locale/ja';
import { locale } from 'dayjs';

const DateInputGroup = function render({
  inputRef = null,
  errors,
  disablePast = false,
  onChange = () => {
    return;
  },
  label,
  isRequired = false,
}: {
  inputRef?: React.Ref<HTMLInputElement>;
  name: string;
  value: DatePickerProps<Date>['value'];
  onChange: DatePickerProps<Date>['onChange'];
  disablePast: DatePickerProps<Date>['disablePast'];
  label?: string;
  isRequired?: boolean;
  errors: FieldError | undefined;
}) {
  return (
    <div className="children:mb-1">
      {label && <InputLabel label={label} isRequired={isRequired} />}
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        adapterLocale={locale({
          ...ja,
        })}
      >
        <DatePicker inputRef={inputRef} disablePast={disablePast} onChange={onChange} />
      </LocalizationProvider>
      {errors && <InputValidateError errors={errors} />}
    </div>
  );
};

export default DateInputGroup;
