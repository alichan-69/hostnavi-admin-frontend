import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import type { DefaultListItemProps } from '.';
import { MdOutlineExpandLess, MdOutlineExpandMore } from 'react-icons/md';

const ICON_SIZE = 24;

const ButtonListItem = ({ item, collapseOpen, onClick }: DefaultListItemProps) => {
  const children = item.children;

  return (
    <ListItem secondaryAction={item.secondaryAction} disablePadding>
      <ListItemButton onClick={onClick}>
        {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
        <ListItemText primary={item.text} />
        {children && (collapseOpen ? <MdOutlineExpandLess size={ICON_SIZE} /> : <MdOutlineExpandMore size={ICON_SIZE} />)}
      </ListItemButton>
    </ListItem>
  );
};

export default ButtonListItem;
