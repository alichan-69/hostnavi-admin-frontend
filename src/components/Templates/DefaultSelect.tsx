import { Select, MenuItem, SelectChangeEvent } from '@mui/material';
import type { MenuItemsType } from '../Parts/MenuItems';
import { ReactNode, forwardRef } from 'react';
import type { DefaultComponentProps } from '../types';
import { classOverride } from '../../utils/classoverride';

export type SelectOnChange = (event: SelectChangeEvent<string | number>, child: ReactNode) => void;

export declare type DefaultSelectProps = {
  name?: string;
  value: string | number;
  menuItems?: MenuItemsType;
  errors?: any;
  onChange: SelectOnChange;
} & DefaultComponentProps;

const DefaultSelect = forwardRef<HTMLInputElement, DefaultSelectProps>(function render(
  { className = '', name = '', value, menuItems, errors, onChange },
  ref,
) {
  return (
    <Select
      id={name}
      className={classOverride(className, 'bg-thirdly')}
      name={name}
      value={value}
      error={Boolean(errors)}
      onChange={onChange}
      ref={ref}
    >
      {menuItems?.map((menuItem, index) => (
        <MenuItem key={index} value={menuItem.value}>
          {menuItem.label}
        </MenuItem>
      ))}
    </Select>
  );
});

export default DefaultSelect;
