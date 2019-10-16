import React, { useState } from 'react';

import closeIcon from '../../assets/close.svg';
import downloadIcon from '../../assets/download.svg';
import loopLoader from "../../assets/rolling.svg";
import placeholder from "../../assets/img-holder.png";

const ImageViewer = (props) => {
  const { isOpen, imageUrl, setOpen } = props;
  const [loading, setLoading] = useState(true);

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
          {
            loading === true && (
              <React.Fragment>
                <img src={loopLoader} className="sc-img-uploading" />
                <img
                  src={placeholder}
                  style={{ opacity: 0 }}
                />
              </React.Fragment>
            )
          }
          <img
            style={loading ? { display: "none" } : {}}
            src={imageUrl}
            onLoad={() => setLoading(false)}
          />
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