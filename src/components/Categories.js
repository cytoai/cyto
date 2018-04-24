import React, { Component } from 'react';
import { Button, List, ListSubheader } from 'material-ui';
import Category from './Category';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from 'material-ui/styles';
import uuidv4 from 'uuid';
import withDragDropContext from './dnd-global-context';

const styles = theme => ({
  create: {
    bottom: theme.spacing.unit * 2,
    position: 'absolute',
    right: theme.spacing.unit * 2
  }
});

class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [
        {
          color: 'rgb(145,159,94)',
          identifier: uuidv4(),
          name: '0',
          pathname: ''
        },
        {
          color: 'rgb(59,140,192)',
          identifier: uuidv4(),
          name: '1',
          pathname: ''
        },
        {
          color: 'rgb(252,244,87)',
          identifier: uuidv4(),
          name: '2',
          pathname: ''
        },
        {
          color: 'rgb(231,80,35)',
          identifier: uuidv4(),
          name: '3',
          pathname: ''
        },
        {
          color: 'rgb(178,97,172)',
          identifier: uuidv4(),
          name: '4',
          pathname: ''
        },
        {
          color: 'rgb(58,219,175)',
          identifier: uuidv4(),
          name: '5',
          pathname: ''
        },
        {
          color: 'rgb(128,189,45)',
          identifier: uuidv4(),
          name: '6',
          pathname: ''
        },
        {
          color: 'rgb(36,112,83)',
          identifier: uuidv4(),
          name: '7',
          pathname: ''
        },
        {
          color: 'rgb(163,140,62)',
          identifier: uuidv4(),
          name: '8',
          pathname: ''
        },
        {
          color: 'rgb(225,17,164)',
          identifier: uuidv4(),
          name: '9',
          pathname: ''
        }
      ]
    };
  }

  onClick = () => {
    const category = {
      color: '',
      identifier: uuidv4(),
      name: ''
    };

    this.setState(previousState => ({
      categories: [...previousState.categories, category]
    }));
  };

  render() {
    return (
      <React.Fragment>
        <List subheader={<ListSubheader>Categories</ListSubheader>}>
          {this.state.categories.map(category => (
            <Category
              key={category.identifier}
              identifier={category.identifier}
              color={category.color}
              name={category.name}
              pathname={category.pathname}
            />
          ))}
        </List>

        <Button
          className={this.props.classes.create}
          onClick={this.onClick}
          variant="fab"
        >
          <AddIcon />
        </Button>
      </React.Fragment>
    );
  }
}

export default withDragDropContext(
  withStyles(styles, { withTheme: true })(Categories)
);
