import React, { useState, useEffect } from "react";
import { AkeedCare } from "akeed-care";
import _ from "lodash";
import moment from "moment";
import socketIOClient from "socket.io-client";
import TestArea from "./TestArea";
import Header from "./Header";
import Footer from "./Footer";
import logoURL from "./assets/img/logo@2x.png";
import loaderImg from "./assets/img/loop-loader.gif";
import "./assets/styles";

const endpoint = "https://staging.flyakeed.com:3030";
const dummyToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MTZjZDNiMjgyZGE5NTUzYzkxNWYyNTVjNDMxYThhZjE3NWY2YTkzYzA2ZTM4ODEyMzU0NjBiYzNmMzZlMWI1YjAyNTI2NzJmYTA1YTdkNGU4MWMyZWQwMzBkM2RiN2YyODUzNGY0MDVlZTM5NDYzNzNjY2M4YzNlNzM1ZDllZGNlNzYxZWUwNWU5MCIsImlhdCI6MTY4NTQzOTg5Mn0.p4jt-txx1hoUS4twUWVMt_xrQPmKzP8Gwjuzz4W5clA";
const App = () => {
  const [socket, setSocket] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [messageList, setMessage] = useState([]);
  const [pageOffset, setOffset] = useState(0);
  const [state, setState] = useState({
    newMessagesCount: 0,
    isConnected: false,
    offset: 0
  });

  useEffect(() => {
    initSocket();
  }, []);

  useEffect(() => {
    if (messageList.length) {
      fetchMessages(pageOffset);
    }
  }, [pageOffset]);

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

  const fetchPreviousMessages = () => {
    fetchMessages(0);
  };

  const fetchMessages = async offset => {
    try {
      const response = await fetch(
        `${endpoint}/api/messages/corp?offset=${pageOffset}&sort=desc`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorize: dummyToken
          }
        }
      );
      const json = await response.json();
      const { error, data } = json;
      const list = error ? [] : arrangeMessage(data.messages);
      setState({ ...state, isConnected: true });
      setMessage(prevMsg => {
        return [...list, ...prevMsg];
      });
    } catch (error) {
      setMessage(prevMsg => {
        return [...prevMsg, ...[]];
      });
      setState({ ...state, isConnected: true });
      console.error("Error:", error);
    }
  };

  const initMessageReceived = socketParams => {
    socketParams.on("chat_message", data => {
      console.log(data);
      pushMessage(data);
    });
  };

  const pushMessage = data => {
    const { type, sender, message, thumbnail } = data;
    const messageData = {
      type,
      author: sender.type === "corp_admin" ? "me" : "them",
      sender,
      dateCreated: moment(data.date_created).format("YYYY-MM-DD hh:mm"),
      id: data._id,
      data: {
        text: message,
        imageUrl: `${endpoint}/api/corp${message}?token=${dummyToken}`,
        thumbnail: `${endpoint}/api/corp${thumbnail}?token=${dummyToken}`
      }
    };
    setMessage(preMessages => [...preMessages, messageData]);
  };

  const arrangeMessage = list => {
    const data = [];
    _.forEachRight(list, prop => {
      const { type, sender, message, thumbnail } = prop;
      data.push({
        type,
        author: sender.type === "corp_admin" ? "me" : "them",
        sender,
        id: prop._id,
        dateCreated: moment(prop.date_created).format("YYYY-MM-DD hh:mm"),
        data: {
          text: message,
          imageUrl: `${endpoint}/api/corp${message}?token=${dummyToken}`,
          thumbnail: `${endpoint}/api/corp${thumbnail}?token=${dummyToken}`
        }
      });
    });

    return data;
  };

  const onMessageWasSent = message => {
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
    const messageData = {
      type: "image",
      author: "me",
      id: "",
      dateCreated: moment().format("YYYY-MM-DD hh:mm"),
      data: {
        text: "sc-temp-image",
        imageUrl: objectURL,
        thumbnail: objectURL
      }
    };

    setMessage(preMessages => [...preMessages, messageData]);

    uploadFile(fileList);
  };

  const uploadFile = async fileList => {
    const file = fileList[0];
    const formData = new FormData();
    formData.append("attachment", file);
    try {
      await fetch(`${endpoint}/api/message/corp`, {
        method: "POST",
        headers: {
          authorize: dummyToken
        },
        body: formData
      });
      const list = _.filter(messageList, o => o.data.text !== "sc-temp-image");
      setMessage(list);
    } catch (error) {
      console.log(error);
    }
  };

  const onfetchNewData = () => {
    setState(prevState => {
      return {
        ...prevState,
        isConnected: false
      };
    });
    setOffset(pageOffset + 15);
  };

  const handleClick = () => {
    setOpen(!isOpen);
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
        onMessageWasSent={onMessageWasSent}
        onFilesSelected={_onFilesSelected}
        messageList={messageList}
        newMessagesCount={state.newMessagesCount}
        onfetchNewData={onfetchNewData}
        handleClick={handleClick}
        isOpen={isOpen}
        isConnected={state.isConnected}
      />
      <img className="demo-monster-img" src={logoURL} />
      <Footer />
    </div>
  );
};

export default App;
