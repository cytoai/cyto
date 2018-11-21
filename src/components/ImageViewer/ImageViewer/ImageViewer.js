import React, { Component } from 'react';
import styles from './ImageViewer.css';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Grid, IconButton, Toolbar } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import ImageViewerChannelDrawer from '../ImageViewerChannelDrawer/ImageViewerCannelDrawer';
import ImageViewerExposureDrawer from '../ImageViewerExposureDrawer/ImageViewerExposureDrawer';

class ImageViewer extends Component {
  state = {
    channelDrawerToggled: false,
    exposureDrawerToggled: false
  };

  toggleChannelDrawer = () => {
    this.setState({
      channelDrawerToggled: !this.state.channelDrawerToggled
    });
  };

  toggleExposureDrawer = () => {
    this.setState({
      exposureDrawerToggled: !this.state.exposureDrawerToggled
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="inherit" className={classes.appbar}>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={this.props.onClose}
            >
              <ArrowBackIcon />
            </IconButton>

            <div className={classes.grow} />

            <IconButton
              className={classes.menuButton}
              color="inherit"
              onClick={this.toggleChannelDrawer}
            >
              <ColorLensIcon />
            </IconButton>

            <IconButton
              className={classes.menuButton}
              color="inherit"
              onClick={this.toggleExposureDrawer}
            >
              <EqualizerIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Grid container spacing={24} />

        <ImageViewerChannelDrawer
          onClose={this.toggleChannelDrawer}
          open={this.state.channelDrawerToggled}
        />

        <ImageViewerExposureDrawer
          onClose={this.toggleExposureDrawer}
          open={this.state.exposureDrawerToggled}
        />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ImageViewer);
