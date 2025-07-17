import React from "react";
import { useUser } from "../../context/CreateContext";
import Avatar from "../Avatar";
import DefaultAvatar from "../DefaultAvatar";

const ChatHeader = () => {
  const { currClient } = useUser();

  return (
    <>
      <div className="h-16 px-4 border-b-2 border-gray-300 flex justify-between items-center">
        {/* <div className="w-10 text-center">
          <button onClick={() => setCurrChat("")}>
            <i className="bi bi-arrow-left"></i>
          </button>
        </div> */}
        <div className="flex-1 flex gap-x-4 items-center">
          {currClient?.picture ? (
            <Avatar src={currClient?.picture} />
          ) : (
            <DefaultAvatar fullname={currClient?.fullname} />
          )}
          <div>
            <p>{currClient?.fullname}</p>
            <p className="text-xs text-gray-400">{currClient?.phone}</p>
          </div>
        </div>
        <div className=" "></div>
      </div>
    </>
  );
};

export default ChatHeader;
