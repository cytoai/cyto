import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Gallery.css';
import Items from '../Items/Items.js';
import SelectionBox from '../SelectionBox/SelectionBox.js';
import CustomDragLayer from '../CustomDragLayer/CustomDragLayer';
import { collisionDetection } from '../helper.js';

class Gallery extends PureComponent {
  constructor() {
    super();
    this.state = {
      selected: [],
      collisions: [],
      selectionBoxCoordinates: {
        x1: 0,
        x2: 0,
        y1: 0,
        y2: 0
      },
      selectionBoxVisibility: 'hidden',
      currentlyDraggedItem: null,
      shiftKeyPressed: false,
      altKeyPressed: false,
      mouseDown: false,
      windowWidth: window.innerWidth
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyEvent);
    document.addEventListener('keyup', this.keyEvent);
    window.addEventListener('resize', this.windowResizeEvent);
  }

  onmousedown = e => {
    let currentSelectionBoxCoordinates = {
      ...this.state.selectionBoxCoordinates
    };
    currentSelectionBoxCoordinates.x1 = e.clientX; //Set the initial X
    currentSelectionBoxCoordinates.y1 = e.clientY; //Set the initial Y
    currentSelectionBoxCoordinates.x2 = e.clientX; //Set the initial X
    currentSelectionBoxCoordinates.y2 = e.clientY; //Set the initial Y
    this.setState({
      mouseDown: true,
      selectionBoxCoordinates: currentSelectionBoxCoordinates
    });
    // Only activate selection box when not dragging on a selectable item
    if (e.target.getAttribute('type') !== 'selectableElement') {
      this.setState({ selectionBoxVisibility: 'visible' });
    }
  };

  onmousemove = e => {
    // Always update coordinates based on mouse position
    let currentSelectionBoxCoordinates = {
      ...this.state.selectionBoxCoordinates
    };
    currentSelectionBoxCoordinates.x2 = e.clientX;
    currentSelectionBoxCoordinates.y2 = e.clientY;
    if (this.state.mouseDown) {
      this.setState({
        selectionBoxCoordinates: currentSelectionBoxCoordinates
      });
    }
    // Only check for collisions if selection box is active
    if (this.state.selectionBoxVisibility === 'visible') {
      const collisions = collisionDetection(currentSelectionBoxCoordinates);
      this.setState({ selected: collisions, collisions: collisions });
      this.props.setSelectedImages(collisions);
    }
  };

  onmouseup = e => {
    // Check if no collisions occured and mouseup event is outside of a selectable item
    if (
      e.target.getAttribute('type') !== 'selectableElement' &&
      this.state.collisions.length === 0
    ) {
      // if so unselect all items
      this.setState({ selected: [] });
      this.props.setSelectedImages([]);
    }
    // Hide selection box und reset collisions
    this.setState({
      mouseDown: false,
      selectionBoxVisibility: 'hidden',
      collisions: []
    });
  };

  selectItem = imgId => {
    let selectedItems = [...this.state.selected];
    const noSelectedItems = selectedItems.length;
    // Check if clicked on an already selected item
    if (selectedItems.includes(imgId)) {
      return;
    }
    // Check if shiftkey is pressed
    if (this.state.shiftKeyPressed) {
      selectedItems.push(imgId);
    }
    // Check if alt keys is pressed
    else if (this.state.altKeyPressed) {
      // Select a range of images
      let selectOthers = false;
      const lastSelected = selectedItems[selectedItems.length - 1];
      for (let image of this.props.images) {
        if (image.id === imgId || image.id === lastSelected) {
          selectedItems.push(image.id);
          selectOthers = !selectOthers;
        }
        if (selectOthers && noSelectedItems !== 0) selectedItems.push(image.id);
      }
    }
    // No special key pressed
    else {
      selectedItems = [imgId];
    }
    // Set selected state
    this.props.setSelectedImages(selectedItems);
    this.setState({ selected: selectedItems });
  };

  setCurrentlyDraggedItem = value => {
    // if item is dragged value = imgId otherwise value = null
    this.setState({ currentlyDraggedItem: value });
  };

  keyEvent = e => {
    this.setState({
      shiftKeyPressed: e.shiftKey,
      altKeyPressed: e.getModifierState('Alt')
    });
  };

  windowResizeEvent = e => {
    this.setState({ windowWidth: e.target.innerWidth });
  };

  render() {
    const { images, imagesPerRow, decreaseWidth, callOnDragEnd } = this.props;
    // Check if no images are visible or available
    if (images.length === 0) return null;

    return (
      <div
        className="container noselect"
        onMouseDown={this.onmousedown}
        onMouseMove={this.onmousemove}
        onMouseUp={this.onmouseup}
      >
        <CustomDragLayer draggedItem={this.state.currentlyDraggedItem} />
        <SelectionBox
          selectionBoxCoordinates={this.state.selectionBoxCoordinates}
          visibility={this.state.selectionBoxVisibility}
        />
        <Items
          images={images}
          imagesPerRow={imagesPerRow}
          windowWidth={this.state.windowWidth}
          decreaseWidth={decreaseWidth}
          selectItem={this.selectItem}
          selectedItems={this.state.selected}
          ondrag={this.setCurrentlyDraggedItem}
          callOnDragEnd={callOnDragEnd}
        />
      </div>
    );
  }
}

Gallery.propTypes = {
  images: PropTypes.array.isRequired,
  imagesPerRow: PropTypes.number,
  decreaseWidth: PropTypes.number,
  setSelectedImages: PropTypes.func,
  callOnDragEnd: PropTypes.func
};

Gallery.defaultProps = {
  decreaseWidth: 0,
  imagesPerRow: 10
};

export default Gallery;
