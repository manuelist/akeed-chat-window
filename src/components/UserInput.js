import PropTypes from "prop-types";
import React, { useState, useRef } from "react";
import SendIcon from "./icons/SendIcon";
import FileIcon from "./icons/FileIcon";

const UserInput = props => {
  const userInput = useRef(null);
  const fileUploadButton = useRef(null);

  const [state, setState] = useState({
    inputActive: false,
    inputHasText: false
  });

  const handleKeyDown = event => {
    if (event.keyCode === 13 && !event.shiftKey) {
      return _submitText(event);
    }
  };

  const handleKeyUp = event => {
    const inputHasText =
      event.target.innerHTML.length !== 0 && event.target.innerText !== "\n";
    setState({ ...state, inputHasText });
  };

  const _submitText = event => {
    event.preventDefault();
    const text = userInput.current.textContent;
    if (text && text.length > 0) {
      props.onSubmit({
        author: "me",
        type: "text",
        data: { text }
      });
      userInput.current.innerHTML = "";
    }
  };

  const _showFilePicker = () => {
    fileUploadButton.current.click();
  };

  const _onFilesSelected = event => {
    if (event.target.files && event.target.files.length > 0) {
      props.onFilesSelected(event.target.files);
    }
  };

  const _renderSendOrFileIcon = () => {
    if (state.inputHasText) {
      return (
        <div className="sc-user-input--button">
          <SendIcon onClick={_submitText} />
        </div>
      );
    }
    return (
      <div className="sc-user-input--button">
        <FileIcon onClick={_showFilePicker} />
        <input
          type="file"
          name="files[]"
          multiple
          ref={fileUploadButton}
          onChange={_onFilesSelected}
        />
      </div>
    );
  };

  return (
    <form className={`sc-user-input ${state.inputActive ? "active" : ""}`}>
      <div
        role="button"
        tabIndex="0"
        onFocus={() => {
          setState({ ...state, inputActive: true });
        }}
        onBlur={() => {
          setState({ ...state, inputActive: false });
        }}
        ref={userInput}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        contentEditable="true"
        placeholder="Write a reply..."
        className="sc-user-input--text"
      />
      <div className="sc-user-input--buttons">
        <div className="sc-user-input--button" />
        {_renderSendOrFileIcon()}
      </div>
    </form>
  );
};

UserInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onFilesSelected: PropTypes.func.isRequired
};

export default UserInput;
