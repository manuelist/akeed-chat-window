import React, { useState, useEffect } from "react";
import { AkeedCare } from "akeed-care";
import _ from 'lodash';
import socketIOClient from "socket.io-client";
import TestArea from "./TestArea";
import Header from "./Header";
import Footer from "./Footer";
import logoURL from "./assets/img/logo@2x.png";
import "./assets/styles";

const endpoint = "https://staging.flyakeed.com:3030";
const dummyToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiMWYzY2JmOTIyZDE5YjQ4MTEyMGI4NmQ1OWM2ZWNhYjQ3YWEwYzZhYmQyY2M0ZTk5OWQyODMxNTk5YjRlOTViYzQ5Nzg3ZDJkYjA2YzM1Nzg0NmM3ZTU2NWM4MDg0MzE3YTM4ODVlOGY2NWMxMTFmYWY5NWUwN2NkYmEwNzJmZmFhNzM5MTIwZTRmMiIsImlhdCI6MTU3MDEwMzQ0OH0.crcfMGEWtxaX-AWB3LwJ7J66Q9BTCU12folaMSCupYY";
const App = () => {
  const [socket, setSocket] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [messageList, setMessage] = useState([]);
  const [state, setState] = useState({
    newMessagesCount: 0,
    isConnected: false
  });

  useEffect(() => {
    initSocket();
  }, []);

  const initSocket = () => {
    const socket = socketIOClient(endpoint);
    socket.emit(
      "login::corp",
      {
        token: dummyToken
      },
      data => {
        setSocket(socket);
        fetchPreviousMessages();
        initMessageReceived(socket);
      }
    );
  };

  const fetchPreviousMessages = async () => {
    try {
      const response = await fetch(`${endpoint}/api/messages/corp?offset=0`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorize: dummyToken
        }
      });
      const json = await response.json();
      const { error, data } = json;
      const list = error ? [] : arrangeMessage(data.messages);
      setState({ ...state, isConnected: true });
      setMessage(list);
    } catch (error) {
      setMessage([]);
      setState({ ...state, isConnected: true });
      console.error("Error:", error);
    }
  };

  const initMessageReceived = (socketParams) => {
    socketParams.on("chat_message", data => {
      console.log(data);
      pushMessage(data);
    });
  };

  const pushMessage = (data) => {
    const { type, sender, message, thumbnail } = data;
    const messageData = {
      type,
      author: sender.type === "corp_admin" ? "me" : "them",
      data: {
        text: message,
        imageUrl: `${endpoint}/api/corp${message}?token=${dummyToken}`,
        thumbnail: `${endpoint}/api/corp${thumbnail}?token=${dummyToken}`
      }
    }
    setMessage(preMessages => ([
      ...preMessages,
      messageData
    ]));
  };

  const arrangeMessage = (list) => {
    const data = [];
    _.forEach(list, (prop) => {
      const { type, sender, message, thumbnail } = prop;
      data.push({
        type,
        author: sender.type === "corp_admin" ? "me" : "them",
        data: {
          text: message,
          imageUrl: `${endpoint}/api/corp${message}?token=${dummyToken}`,
          thumbnail: `${endpoint}/api/corp${thumbnail}?token=${dummyToken}`
        }
      });
    })

    return data;
  }

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
    setOpen(!isOpen);
  };
  console.log(isOpen);
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
        isOpen={isOpen}
        isConnected={state.isConnected}
      />
      <img className="demo-monster-img" src={logoURL} />
      <Footer />
    </div>
  );
};

export default App;
