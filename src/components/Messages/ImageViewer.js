import React from 'react';

import closeIcon from '../../assets/close.svg';
import downloadIcon from '../../assets/download.svg';

const ImageViewer = (props) => {
  const { isOpen, imageUrl, setOpen } = props;

  const getComponent = () => {
    return (
      <div className="sc-image-viewer">
        <a download target="_blank" href={imageUrl} className="sc-download-image-view">
          <img src={downloadIcon} />
        </a>
        <a className="sc-close-image-view" onClick={() => setOpen(false)}>
          <img src={closeIcon} />
        </a>
        <div className="sc-image-vew">
          <img src={imageUrl} />
        </div>
      </div>
    );
  }

  return (
    isOpen && (
      getComponent()
    )
  );
}

export default ImageViewer;