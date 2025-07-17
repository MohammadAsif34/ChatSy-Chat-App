import React, { useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import { useUser } from "../context/CreateContext";
import { connectSocket, disconnectSocket } from "../services/websocket";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { appKey, user, loading, isAuth } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?._id) return;
    connectSocket(user._id);
    return () => {
      disconnectSocket();
    };
  }, [user?._id]);
  console.log("base :: ", import.meta.env.VITE_BASE_URL);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user && !loading) {
        navigate("/login");
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [loading, user]);

  if (loading)
    return (
      <div className="w-full h-screen flex justify-center items-center text-4xl font-bold text-gray-500">
        Loading
        <span className="inline-block animate-bounce px-1">.</span>
        <span className="inline-block animate-bounce px-1">.</span>
        <span className="inline-block animate-bounce px-1">.</span>
      </div>
    );

  return (
    <>
      <main key={appKey}>
        <section className="w-full h-screen px-[10%] max-sm:px-[2%] max-lg:px-[5%] bg-[#d8f3dc]/50 dark:bg-neutral-900 flex justify-center items-center transition-all duration-500 ease-in-out">
          <MainLayout />
        </section>
      </main>
    </>
  );
};

export default Home;
