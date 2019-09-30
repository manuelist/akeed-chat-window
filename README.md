# AkeedCare
Chat Window Component for FlyAkeed

## Installation

```
$ npm install akeed-care
$ yarn add akeed-care
```

## Example


``` javascript
import React, { useState, useEffect } from "react";
import { AkeedCare } from "akeed-care";
import socketIOClient from "socket.io-client";

const App = () => {
  const [socket, setSocket] = useState(null);
  const [messageList, setMessage] = useState([]);
  const [state, setState] = useState({
    newMessagesCount: 0,
    isOpen: false
  });

  useEffect(() => {
    initSocket();
  }, []);

  const initSocket = () => {
    const socket = socketIOClient("endpoint");
    socket.emit(
      "login",
      {
        token:
          "token",
        type: "userType",
        guest_token: "guestToken"
      },
      data => {
        setSocket(socket);
        initMessageRecieved(socket, messageList);
      }
    );
  };

  const initMessageRecieved = (socketParams, list) => {
    socketParams.on("chat_message", data => {
      pushMessage(data, list);
    });
  };

  const pushMessage = (data, list) => {
    const { type, sender, message } = data;
    const messageData = {
      type: type,
      author: sender.type === "user" ? "me" : "them",
      data: { text: message }
    };
    setMessage(preMessages => ([
      ...preMessages,
      messageData
    ]));
  };

  const _onMessageWasSent = message => {
    const {
      data: { text }
    } = message;

    socket.emit("message_support", {
      message: text,
      device: "desktop",
      is_connected: true
    });
  };

  const _onFilesSelected = fileList => {
    const objectURL = window.URL.createObjectURL(fileList[0]);
    setState({
      ...state,
      messageList: [
        ...state.messageList,
        {
          type: "file",
          author: "me",
          data: {
            url: objectURL,
            fileName: fileList[0].name
          }
        }
      ]
    });
  };

  const _handleClick = () => {
    setState({
      ...state,
      isOpen: !state.isOpen,
      newMessagesCount: 0
    });
  };

  return (
    <div>
      <AkeedCare
        agentProfile={{
          teamName: "Chat Name",
          imageUrl: "Icon Url"
          }}
        onMessageWasSent={_onMessageWasSent}
        onFilesSelected={_onFilesSelected}
        messageList={messageList}
        newMessagesCount={state.newMessagesCount}
        handleClick={_handleClick}
        isOpen={state.isOpen}
      />
    </div>
  );
};

```

For more detailed examples see the example folder.

### Message Objects

Message objects are rendered differently depending on their type. Currently, only text, file, and emoji types are supported. Each message object has an `author` field which can have the value 'me' or 'them'.

``` javascript
{
  author: 'them',
  type: 'text',
  data: {
    text: 'some text'
  }
}

```

### Agent Profile Objects

Look like this:

```js
{
  imageUrl: 'https://somewhere.on/the_web.png',
  teamName: 'Da best'
}
```
