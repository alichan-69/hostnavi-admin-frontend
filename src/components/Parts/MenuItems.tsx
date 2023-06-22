import { MenuItem } from '@mui/material';
import type { MouseEventHandler } from 'react';

export type MenuItemsType = {
  label: string | number;
  value?: string | number;
  onClick?: MouseEventHandler<HTMLLIElement>;
}[];

const MenuItems = function render({ menuItems }: { menuItems: MenuItemsType }) {
  return (
    <>
      {menuItems.map((menuItem, index) => (
        <MenuItem key={index} value={menuItem.value} onClick={menuItem.onClick}>
          {menuItem.label}
        </MenuItem>
      ))}
    </>
  );
};

export default MenuItems;
