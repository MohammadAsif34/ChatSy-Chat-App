import React from "react";
import NoChat from "./NoChat";
import CurrChat from "./CurrChat";
import { useUser } from "../../context/CreateContext";

const ChatSection = () => {
  const { currClient } = useUser();
  return <>{currClient ? <CurrChat /> : <NoChat />}</>;
};

export default ChatSection;
