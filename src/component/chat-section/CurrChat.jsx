import React, { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatSend from "./ChatSend";
import ChatMessage from "./ChatMessage";
import { useUser } from "../../context/CreateContext";

import axios from "axios";
import { onReceiveMessage } from "../../services/websocket";

const CurrChat = () => {
  const { currClient, user } = useUser();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChat = async () => {
      const chatAPI = import.meta.env.VITE_GET_CHATS_API;
      try {
        const res = await axios.get(
          `${chatAPI}/${user?._id}/${currClient?._id}`,
          { withCredentials: true }
        );
        console.log("get chat api :: ", res.data);
        if (res.data.status === "OK") {
          setChats(res.data?.chat);
        }
      } catch (error) {
        console.log("error chat api :: ", error.message);
      }
    };
    fetchChat();
  }, [user?._id, currClient?._id]);

  useEffect(() => {
    const handleNewMessage = (msg) => {
      if (msg?.message && msg?.senderId === currClient?._id) {
        setChats((prev) => [...prev, msg]);
        console.log(msg);
      }
    };
    onReceiveMessage(handleNewMessage);
  }, [currClient?._id]);

  return (
    <div className="w-full h-full flex flex-col">
      <ChatHeader />
      <ChatMessage chats={chats} />
      <ChatSend setChats={setChats} />
    </div>
  );
};

export default CurrChat;
