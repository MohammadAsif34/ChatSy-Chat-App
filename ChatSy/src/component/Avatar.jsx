import React from "react";

const Avatar = ({ src }) => {
  return (
    <div className="max-w-10 min-w-10 h-10 bg-neutral-700 rounded-full overflow-hidden">
      <img
        src={src}
        alt="profile picture"
        loading="lazy"
        className="w-full h-full object-center object-cover"
      />
    </div>
  );
};

export default Avatar;
