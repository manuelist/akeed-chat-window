import React from "react";
import TextMessage from "./TextMessage";
import EmojiMessage from "./EmojiMessage";
import FileMessage from "./FileMessage";
import ImageMessage from "./ImageMessage";
import TextNode from "./TextNode";

const Message = props => {
  const { message, sender } = props;
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
      case "node":
        return <TextNode {...message} />;
      default:
        console.error(
          `Attempting to load message with unsupported file type '${type}'`
        );
    }
  };

  return (
    <React.Fragment>
      {message.author === "me" ? null : (
        <div className="agent-name-container">
          <span className="sc-message--text-agent-name">
            {message.sender.first_name}
          </span>{" "}
          <span className="sc-message--text-agent-name sc-message--text-agent-lname">
            {message.sender.last_name}
          </span>
        </div>
      )}
      <div className="sc-message">
        <div className={contentClassList.join(" ")}>
          {_renderMessageOfType(message.type)}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Message;
