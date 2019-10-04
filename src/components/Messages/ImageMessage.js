import React, { useState } from "react";
import ImgsViewer from "react-images-viewer";

import Image from './ImageViewer';

const dummyImage =
  "https://cdn.atulhost.com/wp-content/uploads/2019/06/anime-wallpaper-01.jpg";

const ImageMessage = props => {
  const { imageUrl, thumbnail } = props.data;
  const [isOpen, setOpen] = useState(false);
  const renderImageView = () => {
    return (
      <div
        className="sc-message--thumbnail"
        onClick={e => setOpen(true)}
        role="button"
        tabIndex="-1"
      >
        <img src={thumbnail} />
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
