import React from "react";

const TextMessage = props => {
  return (
    <div className="sc-message--text" data-id={props.id}>
      <span dangerouslySetInnerHTML={{ __html: props.data.text }} />
      <span className="sc-timestamp">{props.dateCreated}</span>
    </div>
  );
};

export default TextMessage;
