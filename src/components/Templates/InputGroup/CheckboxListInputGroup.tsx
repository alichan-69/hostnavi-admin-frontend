import { FormControlLabel, Checkbox } from '@mui/material';
import type { ChangeEvent } from 'react';
import InputLabel from '../../Parts/InputLabel';

const CheckboxListInputGroup = function render({
  label,
  name,
  checkedList,
  labels,
  onChange,
  isRequired = false,
}: {
  label: string;
  name: string;
  checkedList: boolean[];
  labels: string[];
  onChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  isRequired?: boolean;
}) {
  return (
    <div className="children:mb-2">
      {label && <InputLabel htmlFor={name} label={label} isRequired={isRequired} />}
      {labels.map((label, i) => (
        <FormControlLabel
          name={String(i)}
          key={`${name}-checkbox-${i}`}
          label={label}
          control={<Checkbox onChange={onChange} checked={checkedList[i] || false} />}
        />
      ))}
    </div>
  );
};

export default CheckboxListInputGroup;
