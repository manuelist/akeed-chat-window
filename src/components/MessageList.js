import React, { useEffect, useRef, useState } from "react";
import Message from "./Messages";

const MessageList = props => {
  const scrollList = useRef(null);
  const [isFetch, setFetch] = useState(false);

  useEffect(() => {
    try {
      if (props.messages.length) {
        if (isFetch) {
          const first = scrollList.current.children[14];
          first.scrollIntoView();
          setFetch(false);
        } else {
          scrollToBottom();
        }
      }
    } catch (error) {
      // scrollToBottom();
    }
  }, [props.messages]);

  const scrollToBottom = () => {
    const list = scrollList.current;
    const scrollHeight = list.scrollHeight;
    const height = list.clientHeight;
    const maxScrollTop = scrollHeight - height;
    list.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  };

  const debounce = (func, wait, immediate) => {
    let timeout;
    return function() {
      let context = this;
      let args = arguments;
      let later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  const listener = debounce(e => {
    if (scrollList.current.scrollTop === 0) {
      setFetch(true);
      // Fetch new data
      props.onfetchNewData();
    }
  }, 250);

  useEffect(() => {
    scrollList.current.addEventListener("scroll", listener);
    return () => {
      scrollList.current.removeEventListener("scroll", listener);
    };
  });

  const getTime = (msg, nextMsg) => {
    try {
      if (nextMsg) {
        if (msg.dateCreated !== nextMsg.dateCreated) {
          return msg.dateCreated;
        }
      } else {
        return msg.dateCreated;
      }
    } catch (error) {
      return '';
    }
  }

  return (
    <div className="sc-message-list" ref={scrollList}>
      {props.messages.map((message, i) => {
        return (
          <React.Fragment key={i}>
            <Message message={message} key={i} />
            { message.author === "me" && (<span className="sc-time-created">{getTime(message, props.messages[i + 1])}</span>) }
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default MessageList;
