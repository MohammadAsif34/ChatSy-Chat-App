import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useUser } from "../../context/CreateContext";

const AddContact = ({ isAdd, setIsAdd }) => {
  const { setRefresh } = useUser();
  const [phone, setPhone] = useState("");

  const handleAddContact = async () => {
    console.log("add contact ", { phone });
    const AddContactAPI = import.meta.env.VITE_ADD_CONTACT_API;
    try {
      const res = await axios.post(
        AddContactAPI,
        { phone },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      if (res.data.status == "OK") {
        // console.log(object)
        toast.success(res.data?.message);
        setRefresh((p) => p + 1);
        setIsAdd((e) => !e);
      } else {
        toast.error(res.data?.message);
      }
    } catch (error) {
      console.log("error addContact api :: ", error.message);
    } finally {
      setPhone("");
    }
  };
  return (
    <>
      <div
        className={`w-full h-0 px-3 flex items-center gap-x-3 ${
          isAdd && "h-18"
        } absolute top-14 left-0 bg-white border-b-2 border-gray-200 dark:bg-black rounded-fu transition-all duration-500 ease-in-out overflow-hidden`}
      >
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full h-8 px-3 text-sm border border-[#74c69d] rounded-md focus:ring-1 focus:ring-[#74c69d] focus:outline-0"
          placeholder="Phone No.."
        />
        <button
          className="h-8 px-2  whitespace-nowrap border text-[#52b788] border-[#b7e4c7] rounded-md hover:bg-[#52b788] hover:text-white"
          onClick={handleAddContact}
        >
          <i className="bi bi-person-check text-2xl text-[#74c69d]"></i>
        </button>
      </div>
    </>
  );
};
export default AddContact;
