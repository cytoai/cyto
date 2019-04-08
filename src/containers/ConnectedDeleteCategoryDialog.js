import { connect } from 'react-redux';
import DeleteCategoryDialog from '../components/Dialog/DeleteCategoryDialog/DeleteCategoryDialog';
import { deleteCategoryAction } from '../actions/categories';
import { setImageCategoryToNullBasedOnCategoryAction } from '../actions/images';

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    deleteCategory: categoryIdentifier => {
      dispatch(deleteCategoryAction(categoryIdentifier));
      dispatch(setImageCategoryToNullBasedOnCategoryAction(categoryIdentifier));
    }
  };
};

const ConnectedDeleteCategoryDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteCategoryDialog);

export default ConnectedDeleteCategoryDialog;
