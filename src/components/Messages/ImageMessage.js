import React, { useState } from "react";
import Image from "./ImageViewer";

import loopLoader from "../../assets/rolling.svg";
import placeholder from "../../assets/img-holder.png";

const ImageMessage = props => {
  const { imageUrl, thumbnail, text } = props.data;
  const [isOpen, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const imageClass = text === "sc-temp-image" || loading === true ? "sc-img-upload sc-opacity" : "sc-img-upload";
  const renderImageView = () => {
    return (
      <div
        className="sc-message--thumbnail"
        onClick={e => setOpen(true)}
        role="button"
        tabIndex="-1"
      >
        <div className="sc-upload-loader">
          {text === "sc-temp-image" || loading === true ? (
            <img src={loopLoader} className="sc-img-uploading" />
          ) : null}
          {
            loading === true && (
              <img
                src={placeholder}
                className={imageClass}
                style={{ opacity: 0 }}
              />
            )
          }
          <img
            style={loading ? { display: "none" } : {}}
            src={thumbnail}
            className={imageClass}
            onLoad={() => setLoading(false)}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="sc-message--image">
      {renderImageView()}
      <Image isOpen={isOpen} imageUrl={imageUrl} setOpen={setOpen} />
    </div>
  );
};

export default ImageMessage;
