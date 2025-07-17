import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useUser } from "../../context/CreateContext";
import { toast } from "react-toastify";

const UserProfile = () => {
  const { user, setUser } = useUser();

  const handleLogout = async () => {
    const logoutAPI = import.meta.env.VITE_LOGOUT_API;
    try {
      const res = await axios.post(logoutAPI, {}, { withCredentials: true });
      console.log("logout api :: ", res.data);
      if (res.data.status === "OK") {
        setUser(null);
        toast.success(res.data?.message);
      } else {
        toast.error(res.data?.message);
      }
    } catch (error) {
      console.log("error logout api :: ", error.message);
    }
  };

  return (
    <>
      <div className="h-16 px-4 border-t-2 border-gray-200 flex justify-between items-center">
        <div className="max-w-10 min-w-10 h-10 bg-[#b7e4c7] rounded-full overflow-hidden">
          {user?.picture ? (
            <img
              src={"./vite.svg"}
              alt="profile picture"
              loading="lazy"
              className="w-full h-full object-center object-cover"
            />
          ) : (
            // <div>
            <i className="inline-block bi bi-person text-2xl translate-x-2 translate-y-1 text-gray-500"></i>
            // </div>
          )}
        </div>
        <div>
          {user ? (
            <>
              <h1>{user?.fullname}</h1>
              <p className="text-xs text-gray-400">{user?.phone}</p>
            </>
          ) : (
            <Link to={"/login"}>Login</Link>
          )}
        </div>
        <div
          className="text-gray-400  hover:rotate-90 transition-all duration-500 ease-in-out cursor-pointer"
          onClick={() => handleLogout()}
        >
          <i className="bi bi-gear text-2xl"></i>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
