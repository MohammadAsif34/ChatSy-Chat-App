import { useEffect, useRef } from "react";
import MessageCard from "./MessageCard";

const ChatMessage = ({ chats = [] }) => {
  const scrollEndRef = useRef(null);

  useEffect(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  return (
    <>
      <div className=" px-3 py-2 bg-gray-100 dark:bg-neutral-900 flex-1 flex flex-col overflow-x-hidden overflow-y-auto transition-all duration-700 ease-in-out ">
        {chats?.map((chat, idx) => (
          <MessageCard key={chat?._id || idx} message={chat} />
        ))}
        <div ref={scrollEndRef}></div>
      </div>
    </>
  );
};

export default ChatMessage;
