import React from 'react';
import closeIcon from './../assets/close-icon.png';

const Header = (props) => {
  return (
    <div className="sc-header">
      <div className="sc-chat-inline">
        <div className="sc-chat-logo-con">
          <img className="sc-header--img" src={props.imageUrl} alt="" />
        </div>
      </div>
      <div className="sc-akeed-care-text">
        <div className="sc-header--team-name">
          <span className="sc-team-name">{props.teamName}</span>
          <span className="sc-status-online" />
          {' '}
          <span className="sc-status-text">Online</span>
        </div> 
      </div>
      <div className="sc-header--close-button" onClick={props.onClose}>
        <img src={closeIcon} alt="" />
      </div>
    </div>
  );
}

export default Header;
