import * as React from 'react';
import styles from './ColorIconButton.css';
import { makeStyles } from '@material-ui/styles';
import * as MaterialUI from '@material-ui/core';
import LabelIcon from '@material-ui/core/SvgIcon/SvgIcon';
import useMenu from '../../hooks/Menu';
import ConnectedColorPicker from '../../containers/ConnectedColorPicker';

const useStyles = makeStyles(styles);

type Props = {
  color: string;
  onColorChange: (color: string) => void;
};

const ColorIconButton = (props: Props) => {
  const { color, onColorChange } = props;

  const { anchorEl, openedMenu, openMenu, closeMenu } = useMenu();

  const classes = useStyles();

  const onChange = (color: string) => {
    onColorChange(color);

    closeMenu();
  };

  return (
    <React.Fragment>
      <MaterialUI.IconButton className={classes.iconButton} onClick={openMenu}>
        <MaterialUI.Avatar
          classes={{ root: classes.avatarRoot }}
          style={{ backgroundColor: color }}
        >
          <LabelIcon style={{ color: '#FFF' }} />
        </MaterialUI.Avatar>
      </MaterialUI.IconButton>

      <MaterialUI.Popover
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        onClose={closeMenu}
        open={openedMenu}
        transformOrigin={{ horizontal: 'center', vertical: 'top' }}
      >
        <div className={classes.colorPicker}>
          <ConnectedColorPicker onChange={onChange} />
        </div>
      </MaterialUI.Popover>
    </React.Fragment>
  );
};

export default ColorIconButton;
