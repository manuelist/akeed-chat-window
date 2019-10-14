import React, { useState } from "react";
import Image from "./ImageViewer";

import loopLoader from "../../assets/rolling.svg";
const dummyImage =
  "https://cdn.atulhost.com/wp-content/uploads/2019/06/anime-wallpaper-01.jpg";

const ImageMessage = props => {
  const { imageUrl, thumbnail, text } = props.data;
  const [isOpen, setOpen] = useState(false);
  const imageClass = text === "sc-temp-image" ? "sc-img-upload sc-opacity" : "sc-img-upload"
  const renderImageView = () => {
    return (
      <div
        className="sc-message--thumbnail"
        onClick={e => setOpen(true)}
        role="button"
        tabIndex="-1"
      >
        <div className="sc-upload-loader">
          {text === "sc-temp-image" ? <img src={loopLoader} className="sc-img-uploading" /> : null}
          <img src={thumbnail} className={imageClass} />
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
