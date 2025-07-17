import React from "react";
import AppHeader from "./AppHeader";
import FilterContainer from "./FilterContainer";
import ContactList from "./ContactList";
import UserProfile from "./UserProfile";

const ContactSection = () => {
  return (
    <>
      <div className="w-full h-full flex flex-col ">
        <AppHeader />
        <FilterContainer />
        <ContactList />
        <UserProfile />
      </div>
    </>
  );
};

export default ContactSection;
