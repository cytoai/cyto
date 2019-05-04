import { connect } from 'react-redux';
import axios from 'axios';
import { SidebarDrawer } from '../pages/images';
import { updateImageProbabilityAction } from '../actions/images';
import {
  createImageAction,
  updateImageCategoryAction
} from '../reducers/images';
import {
  addCategoryAction,
  createCategoryAction
} from '../reducers/categories';

import { toggleSpinnerAction } from '../actions/settings';
import { string } from 'prop-types';

const loadDemoProject = (demo: string) => {
  return (dispatch: any) => {
    return axios
      .get(
        ' https://raw.githubusercontent.com/cytoai/cyto/master/src/demos/' +
          demo +
          '.cyto'
      )
      .then(result => {
        dispatch(toggleSpinnerAction());
        dispatch(createImageAction(result.data.images));
        dispatch(addCategoryAction(result.data.categories));
      })
      .catch(function(error) {
        alert(error);
      });
  };
};

const mapStateToProps = (state: { images: any; categories: any }) => {
  return {
    images: state.images,
    categories: state.categories
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateStore: (data: { images: any; categories: any }) => {
      dispatch(createImageAction(data.images));
      dispatch(addCategoryAction(data.categories));
    },
    updateImageCategory: (
      imgIdentifier: any,
      categoryIdentifier: any,
      categoryName: any
    ) => {
      dispatch(
        updateImageCategoryAction({
          identifier: string,
          categoryIdentifier: string
        })
      );
      dispatch(updateImageProbabilityAction(imgIdentifier, null));
    },
    createCategory: (identfier: any, color: any, description: any) => {
      const category = {
        color: color,
        description: description,
        identifier: identfier,
        index: null,
        visible: true
      };
      dispatch(createCategoryAction(category));
    },
    loadDemoProject: (demo: string) => {
      dispatch(createImageAction({}));
      dispatch(toggleSpinnerAction());
      dispatch(loadDemoProject(demo));
    }
  };
};

const ConnectedSidebar = connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarDrawer);

export default ConnectedSidebar;
