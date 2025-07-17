import React from "react";
import { useUser } from "../../context/CreateContext";
import Avatar from "../Avatar";
import DefaultAvatar from "../DefaultAvatar";
const defaultClient = {
  picture:
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  fullname: "FullName",
  lastMsg: " this is last messagethis is last messagethis is last messagethis,",
};
const ContactCard = ({ client = defaultClient }) => {
  const { setCurrClient } = useUser();

  return (
    <>
      <div
        className="w-full h-18 px-4 border-b-2 border-gray-200 flex gap-x-4 items-center"
        onClick={() => setCurrClient(client)}
      >
        {client?.picture ? (
          <Avatar src={client?.picture} />
        ) : (
          <DefaultAvatar fullname={client?.fullname} />
        )}
        <div className=" w-full">
          <div className="w-3/4 ">
            <h1 className="w-4/5 whitespace-nowrap overflow-hidden truncate">
              {client?.fullname}
            </h1>
            <p className="text-xs text-neutral-400 whitespace-nowrap overflow-hidden truncate">
              {/* {client?.lastMsg} */}
              {client?.phone}
            </p>
          </div>
          <div className=" text-xs text-neutral-400"></div>
        </div>
      </div>
    </>
  );
};

export default ContactCard;
