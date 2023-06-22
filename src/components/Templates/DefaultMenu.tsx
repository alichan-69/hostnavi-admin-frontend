import { Menu } from '@mui/material';
import MenuItems, { MenuItemsType } from '../Parts/MenuItems';

const DefaultMenu = function render({
  anchorEl,
  handleClose,
  menuItems,
}: {
  anchorEl: null | HTMLElement;
  handleClose: (event?: {}) => void;
  menuItems: MenuItemsType;
}) {
  return (
    <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
      <MenuItems menuItems={menuItems} />
    </Menu>
  );
};

export default DefaultMenu;
