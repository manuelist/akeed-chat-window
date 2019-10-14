import PropTypes from 'prop-types';
import React from 'react';

import MessageList from './MessageList';
import Header from './Header';
import UserInput from './UserInput';

import loopLoader from '../assets/rolling.svg';
import chatEmpty from '../assets/chat-empty.svg';

const defaultMessage = "FlyAkeed customer service representative will be happy to help you with anything you need";

const ChatWindow = (props) => {
  const loaderImage = props.agentProfile.loaderImage || loopLoader;
  const messageList = props.messageList || [];
  const emptyMessage = props.emptyMessage || defaultMessage;
  const loaderClass = props.agentProfile.loaderImage ? 'sc-loader-con' : 'sc-loader-con-svg';
  const classList = [
    'sc-chat-window',
    (props.isOpen ? 'opened' : 'closed')
  ];

  const onUserInputSubmit = (message) => {
    props.onUserInputSubmit(message);
  }

  const onFilesSelected = (filesList) => {
    props.onFilesSelected(filesList);
  }

  return (
    <div className={classList.join(' ')}>
      <Header
        teamName={props.agentProfile.teamName}
        imageUrl={props.agentProfile.imageUrl}
        onClose={props.onClose}
        {...props}
      />
      {
        !props.isConnected && (
          <div className={loaderClass}>
            <img src={loaderImage} className="sc-loader-icon" />
          </div>
        )
      }
      {
        messageList.length === 0 && (
          <div>
            <div className="sc-chat-empty-img-con">
              <img src={chatEmpty} className="sc-chat-empty-img" />
              <p className="sc-chat-empty-msg">{emptyMessage}</p>
            </div>
          </div>
        )
      }
      <MessageList
        messages={messageList}
        imageUrl={props.agentProfile.imageUrl}
        {...props}
      />
      <UserInput
        onSubmit={onUserInputSubmit}
        onFilesSelected={onFilesSelected}
        {...props}
      />
    </div>
  );
}

ChatWindow.propTypes = {
  agentProfile: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onFilesSelected: PropTypes.func,
  onUserInputSubmit: PropTypes.func.isRequired,
};

export default ChatWindow;
