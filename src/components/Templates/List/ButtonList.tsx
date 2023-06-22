import { List, Divider, Collapse } from '@mui/material';
import { useState } from 'react';
import { ButtonListItem, RenderListItemProps, DefaultListProps } from '.';

const RenderListItem = ({ item }: RenderListItemProps) => {
  const children = item.children;
  const [collapseOpen, setCollapseOpen] = useState(false);

  const toggleCollapseOpen = () => {
    setCollapseOpen(!collapseOpen);
  };

  return (
    <div>
      {children ? <ButtonListItem item={item} collapseOpen={collapseOpen} onClick={toggleCollapseOpen} /> : <ButtonListItem item={item} />}
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
    </div>
  );
};

const ButtonList = function render({ items, component }: DefaultListProps) {
  return (
    <List component={component}>
      {items.map((item) => (
        <RenderListItem key={item.text} item={item} />
      ))}
    </List>
  );
};

export default ButtonList;
