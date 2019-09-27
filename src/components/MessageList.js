import React, { useEffect, useRef } from "react";
import Message from "./Messages";

const MessageList = (props) => {
  const scrollList = useRef(null);
  useEffect(() => {
    // this.scrollList.scrollTop = this.scrollList.scrollHeight;
    scrollList.current.scrollTop = scrollList.current.scrollHeight;
  }, [scrollList]);

  return (
    <div className="sc-message-list" ref={scrollList}>
      {props.messages.map((message, i) => {
        return <Message message={message} key={i} />;
      })}
    </div>
  );
};

export default MessageList;
