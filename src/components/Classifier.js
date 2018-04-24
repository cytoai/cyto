import React, { Component } from 'react';
import './Classifier.css';
import { withStyles } from 'material-ui/styles';
import {
  AppBar,
  Divider,
  Drawer,
  Grid,
  Toolbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button
} from 'material-ui';
import Categories from './Categories';
import Samples from '../components/Samples';
import data from '../images/mnist.json';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContextProvider } from 'react-dnd';
import * as API from '../API';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawerPaper: {
    position: 'relative'
  },
  primaryToolbar: {
    backgroundColor: theme.palette.background.default
  },
  content: {
    height: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0 // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar
});

class Classifier extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: 10
    };
  }

  onChange = event => {
    this.setState({
      columns: event.target.value
    });
  };

  onDrop = dropped => {
    this.props.drop(dropped);
  };

  render() {
    const { classes } = this.props;

    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div className={classes.root}>
          <AppBar position="fixed" className={classes.appBar} color="default">
            <Toolbar>
              <Typography variant="title" color="inherit" noWrap>
                &nbsp;
              </Typography>

              <Button onClick={() => API.trainOnRun()}>Run</Button>
            </Toolbar>
          </AppBar>

          <Grid container spacing={0}>
            <Grid item xs={3}>
              <Drawer
                classes={{ paper: classes.drawerPaper }}
                variant="permanent"
              >
                <div className={classes.toolbar} />

                <Toolbar />

                <Divider />

                <Categories />
              </Drawer>
            </Grid>

            <Grid item xs={9}>
              <div className={classes.toolbar} />

              <Toolbar className={classes.primaryToolbar}>
                <Grid container spacing={0}>
                  <Grid item xs={10} />

                  <Grid item xs={2}>
                    <input
                      type="range"
                      min="2"
                      max="24"
                      step="1"
                      value={this.state.columns}
                      onChange={this.onChange}
                      style={{ width: '100%' }}
                    />
                  </Grid>
                </Grid>
              </Toolbar>

              <Divider />

              <main className={classes.content}>
                <Samples
                  columns={this.state.columns}
                  drop={this.onDrop}
                  pathnames={data}
                />
              </main>
            </Grid>
          </Grid>
        </div>
      </DragDropContextProvider>
    );
  }
}

export default withStyles(styles)(Classifier);
