import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import ContactCard from "./ContactCard";
import { useUser } from "../../context/CreateContext";

const ContactList = () => {
  const { refresh } = useUser();
  const [contact, setContact] = useState([]);

  useEffect(() => {
    const fetchContact = async () => {
      const contactsAPI = import.meta.env.VITE_CONTACTS_API;
      try {
        const res = await axios.get(contactsAPI, { withCredentials: true });
        console.log(res.data);
        if (res.data.status === "OK") {
          setContact(res.data?.contact);
        }
      } catch (error) {
        console.log("error fetch contacts :: ", error.message);
      }
    };

    fetchContact();
  }, [refresh]);

  return (
    <>
      <div className="flex-1  overflow-y-auto overflow-x-hidden">
        {contact?.map((client, idx) => (
          <ContactCard key={client?._id || idx} client={client} />
        ))}
      </div>
    </>
  );
};

export default ContactList;
