import PropTypes from 'prop-types';
import React from 'react';

import MessageList from './MessageList';
import Header from './Header';
import UserInput from './UserInput';

import loopLoader from '../assets/rolling.svg';

const ChatWindow = (props) => {
  let messageList = props.messageList || [];
  let classList = [
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
      />
      {
        !props.isConnected && (
          <img src={loopLoader} className="sc-loader-icon" />
        )
      }
      <MessageList
        messages={messageList}
        imageUrl={props.agentProfile.imageUrl}
      />
      <UserInput
        onSubmit={onUserInputSubmit}
        onFilesSelected={onFilesSelected}
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
