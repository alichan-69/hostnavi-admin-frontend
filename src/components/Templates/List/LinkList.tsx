import { List, Divider, Collapse } from '@mui/material';
import { useCallback, useState } from 'react';
import { ButtonListItem, LinkListItem, DefaultListProps, RenderListItemProps } from '.';
const RenderListItem = ({ item }: RenderListItemProps) => {
  const children = item.children;
  const [collapseOpen, setCollapseOpen] = useState(false);

  const toggleCollapseOpen = useCallback(() => {
    setCollapseOpen(!collapseOpen);
  }, [collapseOpen]);

  return (
    <>
      {children ? <ButtonListItem item={item} collapseOpen={collapseOpen} onClick={toggleCollapseOpen} /> : <LinkListItem item={item} />}
      {Array.isArray(children) && (
        <Collapse in={collapseOpen}>
          <div>
            {children.map((child) => (
              <RenderListItem key={child.text} item={child} />
            ))}
          </div>
        </Collapse>
      )}
      {item.isDivided && <Divider />}
    </>
  );
};

const LinkList = function render({ items, component, className }: DefaultListProps) {
  return (
    <List component={component} classNames={className}>
      {items.map((item) => (
        <RenderListItem key={item.text} item={item} />
      ))}
    </List>
  );
};

export default LinkList;
