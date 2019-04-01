import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import React, { useState } from 'react';
import styles from './ModelList.css';
import { withStyles } from '@material-ui/core/styles';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SaveIcon from '@material-ui/icons/Save';
import * as API from '../../classifier';

function ModelList(props) {
  const [collapsed, setCollapsed] = useState(0);

  const { categories, images } = props;

  return (
    <List dense>
      <ListItem button onClick={() => setCollapsed(!collapsed)}>
        <ListItemIcon>
          {!collapsed ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemIcon>

        <ListItemText inset primary="Model" />
      </ListItem>

      <Collapse in={!collapsed} timeout="auto" unmountOnExit>
        <ListItem
          dense
          button
          onClick={() => API.fitAndPredict(images, categories)}
        >
          <ListItemIcon>
            <PlayCircleOutlineIcon />
          </ListItemIcon>

          <ListItemText primary="Run Classifier" />
        </ListItem>

        <ListItem dense button component="label">
          <ListItemIcon>
            <OpenInBrowserIcon />
          </ListItemIcon>

          <ListItemText primary="Import Weights" />
          <input
            style={{ display: 'none' }}
            type="file"
            accept="*"
            name="file"
            id="file"
            onChange={e => API.importWeights(e.target.files)}
          />
        </ListItem>

        <ListItem dense button onClick={() => API.exportWeights()}>
          <ListItemIcon>
            <SaveIcon />
          </ListItemIcon>
          <ListItemText primary="Save Weights" />
        </ListItem>
      </Collapse>
    </List>
  );
}

export default withStyles(styles, { withTheme: true })(ModelList);
