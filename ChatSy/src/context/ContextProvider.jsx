import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { UserContext } from "./CreateContext";

export const UserContextProvider = ({ children }) => {
  const [refresh, setRefresh] = useState(0);
  const [appKey, setAppKey] = useState(0);
  const [user, setUser] = useState(null);
  const isAuth = useRef(false);
  const [loading, setLoading] = useState(true);

  const [currClient, setCurrClient] = useState(null);

  useEffect(() => {
    const protect = async () => {
      try {
        const protectAPI = import.meta.env.VITE_PROTECT_API;
        const res = await axios.get(protectAPI, { withCredentials: true });
        console.log("me api :: ", res.data);
        if (res.data.status === "OK") {
          setUser(res.data?.me);
          // isAuth.current = true;
        }
      } catch (error) {
        console.log("protect api :: ", error.message);
      } finally {
        setLoading(false);
      }
    };

    protect();
  }, [appKey]);

  return (
    <UserContext.Provider
      value={{
        appKey,
        setAppKey,
        user,
        setUser,
        loading,
        setLoading,
        isAuth,
        currClient,
        setCurrClient,
        refresh,
        setRefresh,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
