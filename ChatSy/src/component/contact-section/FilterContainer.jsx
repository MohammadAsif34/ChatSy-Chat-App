import React, { useState } from "react";
import AddContact from "./AddContact";

const FilterContainer = () => {
  const [isAdd, setIsAdd] = useState(false);
  return (
    <>
      <div className="h-14 px-3 border-b border-gray-200 flex justify-between items-center relative">
        <div className="w-full text-xs flex items-center gap-x-3">
          <input
            type="text"
            className="w-full h-8 px-4 border border-[#74c69d] rounded-sm focus:outline-0 focus:ring-1 focus:ring-[#74c69d]"
            placeholder="search"
          />
          <button
            className=" px-2 py text-2xl border text-[#52b788] border-[#b7e4c7] rounded-sm whitespace-nowrap cursor-pointer hover:bg-[#52b788] hover:text-white hover:dark:bg-neutral-700 transition-all duration-300"
            onClick={() => setIsAdd((e) => !e)}
          >
            <i className="bi bi-person-add"></i>
          </button>
          {<AddContact isAdd={isAdd} setIsAdd={setIsAdd} />}
          {/* {addContact && <AddContact toggle={setAddContact} />} */}
        </div>
      </div>
    </>
  );
};

export default FilterContainer;
