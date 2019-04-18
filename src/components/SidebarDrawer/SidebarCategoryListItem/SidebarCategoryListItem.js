import * as React from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText
} from '@material-ui/core';
import LabelIcon from '@material-ui/icons/Label';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import IconButton from '@material-ui/core/IconButton';
import { DropTarget } from 'react-dnd';
import StyledCategory from './StyledCategory';
import styles from './SidebarCategoryListItem.css';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';
import ConnectedEditCategoryDialog from '../../../containers/ConnectedEditCategoryDialog';
import ConnectedDeleteCategoryDialog from '../../../containers/ConnectedDeleteCategoryDialog';
import { makeStyles } from '@material-ui/styles';
import useMenu from '../../../hooks/Menu';
import useDialog from '../../../hooks/Dialog';

const spec = {
  drop(props, monitor, component) {
    const selectedItems = monitor.getItem().selectedItems;
    const categoryIdentifer = props.identifier;
    return {
      categoryIdentifier: categoryIdentifer,
      categoryName: props.description,
      color: props.color,
      selectedItems: selectedItems
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

const useStyles = makeStyles(styles);

const SidebarCategoryListItem = props => {
  const {
    openedDialog: openedEditCategoryDialog,
    openDialog: openEditCategoryDialog,
    closeDialog: closeEditCategoryDialog
  } = useDialog();

  const {
    openedDialog: openedDeleteCategoryDialog,
    openDialog: openDeleteCategoryDialog,
    closeDialog: closeDeleteCategoryDialog
  } = useDialog();

  const [animateOnDrop, setAnimateOnDrop] = React.useState(0);

  const { anchorEl, openedMenu, openMenu, closeMenu } = useMenu();

  const classes = useStyles();

  const {
    category,
    identifier,
    updateVisibility,
    displayThisCategoryOnly,
    setUnlabelledVisibility,
    color,
    connectDropTarget,
    description,
    visible,
    categories
  } = props;

  const anchorPosition = {
    top: openedMenu ? anchorEl.getBoundingClientRect().bottom - 10 : 0,
    left: openedMenu ? anchorEl.getBoundingClientRect().left : 0
  };

  const onHideOtherCategoriesClick = () => {
    displayThisCategoryOnly(identifier);

    setUnlabelledVisibility(false);

    closeMenu();
  };

  const onEditCategoryClick = () => {
    openEditCategoryDialog();

    closeMenu();
  };

  const onDeleteCategoryClick = () => {
    openDeleteCategoryDialog();

    closeMenu();
  };

  const onListItemIconClick = () => {
    updateVisibility(category.index);
  };

  const VisibleIcon = props => {
    const { color, visible } = props;

    if (visible) {
      return <LabelIcon style={{ color: color }} />;
    } else {
      return <LabelOutlinedIcon style={{ color: color }} />;
    }
  };

  return (
    <React.Fragment>
      <StyledCategory
        ref={instance => connectDropTarget(instance)}
        color={color}
        onDrop={() => setAnimateOnDrop(!animateOnDrop)}
        className={
          animateOnDrop !== null
            ? animateOnDrop
              ? 'onDropPulse'
              : 'onDropPulse2'
            : null
        }
      >
        <ListItem
          dense
          style={{ cursor: 'pointer' }}
          classes={{
            root: props.isOver ? classes.isOver : null
          }}
        >
          <ListItemIcon onClick={onListItemIconClick}>
            <VisibleIcon color={color} visible={visible} />
          </ListItemIcon>
          <ListItemText primary={description} />
          <ListItemSecondaryAction>
            <IconButton onClick={openMenu}>
              <MoreHorizIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </StyledCategory>

      <Popover
        anchorPosition={anchorPosition}
        anchorReference="anchorPosition"
        id="simple-popper"
        onClose={closeMenu}
        open={openedMenu}
      >
        <Paper>
          <MenuList dense>
            <MenuItem onClick={onHideOtherCategoriesClick}>
              <ListItemText primary="Hide other categories" />
            </MenuItem>

            <MenuItem onClick={onEditCategoryClick}>
              <ListItemText primary="Edit category" />
            </MenuItem>

            <MenuItem onClick={onDeleteCategoryClick}>
              <ListItemText primary="Delete category" />
            </MenuItem>
          </MenuList>
        </Paper>
      </Popover>

      <ConnectedEditCategoryDialog
        categories={categories}
        category={category}
        categoryId={identifier}
        color={color}
        description={description}
        onClose={closeEditCategoryDialog}
        open={openedEditCategoryDialog}
      />

      <ConnectedDeleteCategoryDialog
        category={category}
        categoryIdentifier={identifier}
        description={description}
        onClose={closeDeleteCategoryDialog}
        open={openedDeleteCategoryDialog}
      />
    </React.Fragment>
  );
};

export default DropTarget('SelectedItems', spec, collect)(
  SidebarCategoryListItem
);
