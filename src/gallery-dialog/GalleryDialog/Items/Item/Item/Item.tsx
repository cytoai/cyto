import React from 'react';
import { ImageViewerDialog } from '../../../../../pages/image';
import Image from '../../../../../components/Image/Image';
import { useDialog } from '@piximi/hooks';
import { ImageDragSource } from '@piximi/components';
import { ConnectedLabel } from '..';

export const Item = (props: any) => {
  const { selectedItems, onmousedown, containerStyle, item } = props;

  const { openedDialog, openDialog, closeDialog } = useDialog();

  const unselectedChannels = item.visualization.visibleChannels;

  return (
    <ImageDragSource
      selectedItems={selectedItems}
      onmousedown={onmousedown}
      item={item}
    >
      <ConnectedLabel image={item} />

      <Image
        key={'img' + item.identifier}
        id={item.identifier}
        openImageViewerDialog={openDialog}
        src={item.data}
        brightness={item.brightness}
        contrast={item.contrast}
        unselectedChannels={unselectedChannels}
        height={containerStyle.height}
        width={0.9 * containerStyle.width}
      />

      <ImageViewerDialog
        onClose={closeDialog}
        open={openedDialog}
        src={item.data}
        imgIdentifier={item.identifier}
        brightness={item.brightness}
      />
    </ImageDragSource>
  );
};