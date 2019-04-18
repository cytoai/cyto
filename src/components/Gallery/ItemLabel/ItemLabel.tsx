import * as React from 'react';
import LabelIcon from '@material-ui/icons/Label';
import styles from './ItemLabel.css';
import { IconButton } from '@material-ui/core';
import ConnectedItemCategoryMenu from '../../../containers/ConnectedItemCategoryMenu';
import { makeStyles } from '@material-ui/styles';
import useMenu from '../../../hooks/Menu';

const useStyles = makeStyles(styles);

const ItemLabel = (props: any) => {
  const { anchorEl, openedMenu, openMenu, closeMenu } = useMenu();

  const { categories, image } = props;

  const classes = useStyles();

  const findCategoryColor = () => {
    const index = categories.findIndex((category: any) => {
      return category.identifier === image.categoryIdentifier;
    });

    if (index > -1) {
      return categories[index].color;
    } else {
      return '#000';
    }
  };

  return (
    <React.Fragment>
      <IconButton
        aria-label="categorize"
        classes={{ root: classes.iconButton }}
        disableRipple
        onClick={openMenu}
      >
        <LabelIcon style={{ color: findCategoryColor() }} />
      </IconButton>

      <ConnectedItemCategoryMenu
        anchorEl={anchorEl}
        image={image}
        onClose={closeMenu}
        open={openedMenu}
      />
    </React.Fragment>
  );
};

export default ItemLabel;
