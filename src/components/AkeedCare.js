import PropTypes from "prop-types";
import React, { useState } from "react";
import ChatWindow from "./ChatWindow";

import launcherIcon from "./../assets/logo-no-bg.svg";
import launcherIconActive from "./../assets/close-icon.png";

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
        <img className={"sc-open-icon"} src={launcherIconActive} />
        <img className={"sc-closed-icon"} src={launcherIcon} />
      </div>
      <ChatWindow
        messageList={props.messageList}
        onUserInputSubmit={props.onMessageWasSent}
        onFilesSelected={props.onFilesSelected}
        agentProfile={props.agentProfile}
        isOpen={isOpen}
        onClose={handleClick}
        showEmoji={props.showEmoji}
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
  showEmoji: PropTypes.bool
};

AkeedCare.defaultProps = {
  newMessagesCount: 0,
  showEmoji: true
};

export default AkeedCare;
