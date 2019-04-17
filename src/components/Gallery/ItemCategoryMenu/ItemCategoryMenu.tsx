import * as React from 'react';
import {
  ListItemIcon,
  ListItemText,
  MenuList,
  MenuItem,
  Paper,
  Popover
} from '@material-ui/core';
import LabelIcon from '@material-ui/icons/Label';

const ItemCategoryMenu = (props: any) => {
  const { anchorEl, categories, onClose, open } = props;

  const anchorPosition = {
    top: open ? anchorEl.getBoundingClientRect().bottom - 3 : 0,
    left: open ? anchorEl.getBoundingClientRect().left + 14 : 0
  };

  const items = categories.map((category: any) => (
    <MenuItem key={category.identifier} onClick={onClose}>
      <ListItemIcon>
        <LabelIcon style={{ color: category.color }} />
      </ListItemIcon>

      <ListItemText inset primary={category.description} />
    </MenuItem>
  ));

  return (
    <Popover
      anchorPosition={anchorPosition}
      anchorReference="anchorPosition"
      onClose={onClose}
      open={open}
    >
      <Paper>
        <MenuList dense>{items}</MenuList>
      </Paper>
    </Popover>
  );
};

export default ItemCategoryMenu;
