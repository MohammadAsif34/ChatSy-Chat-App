import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../../context/CreateContext";
import { sendMessage } from "../../services/websocket";

const ChatSend = ({ setChats }) => {
  const { user, currClient } = useUser();
  const [msg, setMsg] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    const data = {
      senderId: user?._id,
      receiverId: currClient?._id,
      message: msg,
    };

    console.log("send :: ", data);

    try {
      const sendAPI = import.meta.env.VITE_SEND_CHAT_API;
      const res = await axios.post(sendAPI, data, { withCredentials: true });
      if (res.data.status === "OK") {
        sendMessage(data);
        setChats((prev) => [...prev, data]);
        setMsg("");
      }
      console.log("send message api :: ", res.data);
    } catch (error) {
      console.log("error send message api :: ", error.message);
    }
  };

  return (
    <>
      <div className="h-16 px-4 border-t-2 border-gray-200 flex gap-x-6 justify-between items-center">
        <button className="w-9 aspect-square  border text-[#52b788] border-[#b7e4c7] rounded-md cursor-pointer hover:bg-[#52b788] hover:text-white active:border-neutral-500 transition-all duration-300">
          +
        </button>
        <form className="w-full h-9 flex gap-x-5 " onSubmit={handleSend}>
          {" "}
          <input
            type="text"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            className="w-full px-4  border border-[#b7e4c7] rounded-md focus:outline-0 focus:border-neutral-500 "
          />
          <button
            type="button"
            className=" px-4 border text-[#52b788] border-[#b7e4c7] rounded-md whitespace-nowrap cursor-pointer hover:bg-[#52b788] hover:text-white active:border-neutral-500 transition-all duration-300"
            onClick={handleSend}
          >
            send <i className="bi bi-send"></i>
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatSend;
