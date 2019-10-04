import React from "react";
import TextMessage from "./TextMessage";
import EmojiMessage from "./EmojiMessage";
import FileMessage from "./FileMessage";
import ImageMessage from './ImageMessage';

const Message = props => {
  const { message } = props;
  let contentClassList = [
    "sc-message--content",
    message.author === "me" ? "sent" : "received"
  ];

  const _renderMessageOfType = type => {
    switch (type) {
      case "text":
        return <TextMessage {...message} />;
      case "emoji":
        return <EmojiMessage {...message} />;
      case "file":
        return <FileMessage {...message} />;
      case "image":
        return <ImageMessage {...message} />;
      default:
        console.error(
          `Attempting to load message with unsupported file type '${type}'`
        );
    }
  };

  return (
    <div className="sc-message">
      <div className={contentClassList.join(" ")}>
        {_renderMessageOfType(message.type)}
      </div>
    </div>
  );
};

export default Message;
