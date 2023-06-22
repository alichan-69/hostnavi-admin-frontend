import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useRouter } from 'next/dist/client/router';
import { MouseEvent, useCallback } from 'react';
import type { DefaultListItemProps } from '.';

const LinkListItem = ({ item }: DefaultListItemProps) => {
  const router = useRouter();

  /** routerでページ遷移を行う処理 */
  const handleOnClick = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    router.push(item.href || '');
  }, []);

  item.inset = typeof item.inset === 'undefined' ? true : item.inset;

  return (
    <ListItem secondaryAction={item.secondaryAction} disablePadding>
      <ListItemButton component="span" onClick={handleOnClick}>
        {item.icon ? <ListItemIcon>{item.icon}</ListItemIcon> : null}
        <ListItemText className={`${!item.inset} && 'pl-0 pr-24`} inset={item.inset} primary={item.text} />
      </ListItemButton>
    </ListItem>
  );
};

export default LinkListItem;
