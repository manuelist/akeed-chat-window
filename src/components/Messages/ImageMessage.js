import React, { useState } from "react";
import ImgsViewer from "react-images-viewer";

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
        <img src={dummyImage} />
      </div>
    );
  };

  return (
    <div className="sc-message--image">
      {renderImageView()}
      <ImgsViewer
        imgs={[
          {
            src: dummyImage
          }
        ]}
        onClose={() => setOpen(false)}
        currImg={0}
        isOpen={isOpen}
      />
    </div>
  );
};

export default ImageMessage;
