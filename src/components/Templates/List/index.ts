import type { ListItemProps } from '@mui/material';
import type { DefaultComponentProps } from '../../types/';

export declare type DefaultListItem = {
  id?: string;
  text: string;
  secondaryAction?: ListItemProps['secondaryAction'];
  icon?: React.ReactNode;
  onItemClick?: () => void;
  isDivided?: boolean;
  href?: string;
  inset?: boolean;
  children?: DefaultListItem[];
};

export declare type DefaultListItems = DefaultListItem[];

export declare type DefaultListProps = {
  items: DefaultListItems;
  component?: any;
} & DefaultComponentProps;

export declare type DefaultListItemProps = {
  item: DefaultListItem;
  collapseOpen?: boolean;
  onClick?: () => void;
};

export declare type RenderListItemProps = {
  item: DefaultListItem;
};

export { default as ButtonList } from './ButtonList';
export { default as ButtonListItem } from './ButtonListItem';
export { default as LinkList } from './LinkList';
export { default as LinkListItem } from './LinkListItem';
