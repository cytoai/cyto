import React, { useState } from 'react';
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import Category from '../SidebarCategoryListItem/SidebarCategoryListItem';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CreateCategoryListItem from '../SidebarCreateCategoryListItem/SidebarCreateCategoryListItem';

export default function SidebarCategoriesList(props) {
  const [collapsed, setCollapsed] = useState(0);

  const [
    createCategoryDialogToggled,
    setCreateCategoryDialogToggled
  ] = useState(0);

  const {
    categories,
    updateCategoryVisibility,
    setUnlabelledVisibility,
    displayThisCategoryOnly,
    connectDropTarget,
    images
  } = props;

  return (
    <React.Fragment>
      <List dense>
        <ListItem button onClick={() => setCollapsed(!collapsed)}>
          <ListItemIcon>
            {!collapsed ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemIcon>

          <ListItemText inset primary="Categories" />
        </ListItem>

        <Collapse in={!collapsed} timeout="auto" unmountOnExit>
          {categories.map((category, index) => (
            <Category
              identifier={category.identifier}
              key={category.identifier}
              index={index}
              description={category.description}
              visible={category.visible}
              color={category.color}
              images={images}
              updateCategoryVisibility={updateCategoryVisibility}
              displayThisCategoryOnly={displayThisCategoryOnly}
              setUnlabelledVisibility={setUnlabelledVisibility}
              connectDropTarget={connectDropTarget}
              editCategory={() =>
                setCreateCategoryDialogToggled(!createCategoryDialogToggled)
              }
            />
          ))}

          <CreateCategoryListItem />
        </Collapse>
      </List>
    </React.Fragment>
  );
}
