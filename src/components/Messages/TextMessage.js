import React from "react";

const TextMessage = props => {
  return (
    <div className="sc-message--text" data-id={props.id}>
      <span>{props.data.text}</span>
      <span className="sc-timestamp">{props.dateCreated}</span>
    </div>
  );
};

export default TextMessage;
