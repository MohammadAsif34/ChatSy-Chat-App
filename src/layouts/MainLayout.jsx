import React from "react";
import ContactSection from "../component/contact-section/ContactSection";
import ChatSection from "../component/chat-section/ChatSection";

const MainLayout = () => {
  return (
    <>
      <section className="w-full h-[625px] bg-white dark:bg-neutral-800 border-2 border-gray-200 rounded-xl overflow-hidden flex shadow-xl ">
        <div className="w-[375px]  max-xl:w-[300px] h-full border-r-2 border-gray-200 transition-all duration-500 ease-in-out">
          <ContactSection />
        </div>
        <div className="flex-1 h-full ">
          <ChatSection />
        </div>
      </section>
    </>
  );
};

export default MainLayout;
