import React, { PureComponent } from 'react';
import styles from './Contrast.css';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Slider from '@material-ui/lab/Slider';

class Contrast extends PureComponent {
  onChange = (event, value) => {
    this.props.setContrast(value);
  };

  render() {
    const { classes, contrast } = this.props;

    return (
      <div className={classes.root}>
        <Typography style={{ color: 'white' }} id="label">
          Contrast
        </Typography>

        <Slider
          classes={{ container: classes.slider }}
          min={50}
          max={300}
          step={0.1}
          value={contrast}
          aria-labelledby="label"
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Contrast);
