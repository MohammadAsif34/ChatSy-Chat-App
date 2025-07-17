import React from "react";

const DefaultAvatar = ({ fullname = "" }) => {
  const name = fullname.trim().split(" ");
  const fst = name[0]?.charAt(0) || "";
  const lst = name[1]?.charAt(0) || "";
  const ch = (fst + lst).toUpperCase();

  return (
    <div className="w-12 h-12 aspect-square rounded-full bg-[#d8f3dc] flex items-center justify-center text-[#74c69d] font-semibold text-lg uppercase">
      {ch}
    </div>
  );
};

export default DefaultAvatar;
