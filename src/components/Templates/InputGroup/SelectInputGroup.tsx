import DefaultSelect, { DefaultSelectProps } from '../DefaultSelect';
import InputValidateError from '../../Parts/InputValidateError';
import InputLabel from '../../Parts/InputLabel';
import { classOverride } from '../../../utils/classoverride';

const SelectInputGroup = function render({
  name = '',
  value,
  selectRef,
  selectClassName,
  menuItems,
  errors,
  onChange,
  label,
  isRequired = false,
}: { selectRef?: React.Ref<HTMLInputElement>; selectClassName?: string; label?: string; isRequired?: boolean } & DefaultSelectProps) {
  return (
    <div className="children:mb-2">
      {label && <InputLabel htmlFor={name} label={label} isRequired={isRequired} />}
      <DefaultSelect
        name={name}
        value={value}
        ref={selectRef}
        menuItems={menuItems || []}
        errors={errors}
        onChange={onChange}
        className={classOverride(selectClassName)}
      />
      {errors && <InputValidateError errors={errors} />}
    </div>
  );
};

export default SelectInputGroup;
