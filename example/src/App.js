import React, { useState, useEffect } from "react";
import { AkeedCare } from "akeed-care";
import socketIOClient from "socket.io-client";
import TestArea from "./TestArea";
import Header from "./Header";
import Footer from "./Footer";
import logoURL from "./assets/img/logo@2x.png";
import "./assets/styles";

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
    const socket = socketIOClient("https://staging.flyakeed.com:3030");
    socket.emit(
      "login",
      {
        token:
          "AoWYEIELu1ZfnF0HdYg5vocm7opZhRBTnOxxWAZ6wb0E-MSANEkrrF7u5aLkjfIH1oO_MEVkivsJQKAiozA61Q",
        type: "user",
        guest_token: null
      },
      data => {
        setSocket(socket);
        initMessageRecieved(socket);
      }
    );
  };

  const initMessageRecieved = (socketParams) => {
    socketParams.on("chat_message", data => {
      pushMessage(data);
    });
  };

  const pushMessage = (data) => {
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
      <Header />
      <TestArea />
      <AkeedCare
        agentProfile={{
          teamName: "AkeedCare",
          imageUrl:
            "https://dsx9kbtamfpyb.cloudfront.net/desktop-web/build/images/logo/logo-icon-colored.png"
        }}
        onMessageWasSent={_onMessageWasSent}
        onFilesSelected={_onFilesSelected}
        messageList={messageList}
        newMessagesCount={state.newMessagesCount}
        handleClick={_handleClick}
        isOpen={state.isOpen}
      />
      <img className="demo-monster-img" src={logoURL} />
      <Footer />
    </div>
  );
};

export default App;
