import PropTypes from "prop-types";
import React, { useState } from "react";
import ChatWindow from "./ChatWindow";

import chatIcon from "./../assets/akeedcare.svg";

const AkeedCare = props => {
  const [state, setState] = useState({
    isOpen: false
  });

  const isOpen = props.hasOwnProperty("isOpen") ? props.isOpen : state.isOpen;
  const classList = ["sc-launcher", isOpen ? "opened" : ""];

  const handleClick = () => {
    if (props.handleClick !== undefined) {
      props.handleClick();
    } else {
      setState({
        ...state,
        isOpen: !state.isOpen
      });
    }
  }

  return (
    <div id="sc-launcher">
      <div
        className={classList.join(" ")}
        onClick={handleClick}
      >
        <div className="sc-chat-button">
          <img className="sc-chat-image" src={chatIcon} />
          {' '}
          AkeedCare
        </div>
      </div>
      <ChatWindow
        messageList={props.messageList}
        onUserInputSubmit={props.onMessageWasSent}
        onFilesSelected={props.onFilesSelected}
        agentProfile={props.agentProfile}
        isOpen={isOpen}
        onClose={handleClick}
        showEmoji={props.showEmoji}
        {...props}
      />
    </div>
  );
};

AkeedCare.propTypes = {
  onMessageWasReceived: PropTypes.func,
  onMessageWasSent: PropTypes.func,
  newMessagesCount: PropTypes.number,
  isOpen: PropTypes.bool,
  handleClick: PropTypes.func,
  messageList: PropTypes.arrayOf(PropTypes.object),
  mute: PropTypes.bool,
};

AkeedCare.defaultProps = {
  newMessagesCount: 0,
};

export default AkeedCare;
