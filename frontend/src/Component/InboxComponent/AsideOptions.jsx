import React, { useContext } from "react";
import { RiMenuSearchLine } from "react-icons/ri";
import { FaHandHolding } from "react-icons/fa";
import { MdOutlineInbox } from "react-icons/md";
import { PiPhoneCall } from "react-icons/pi";
import { InboxContext } from "../../pages/InboxPage";

function AsideOptions() {
  const { setSection, IsSeller, section } = useContext(InboxContext);

  const handleOnclick = (section) => {
    setSection(section);
  };

  const getButtonStyle = (buttonSection) =>
    `w-full h-full hover:bg-[#7222B0] ${
      section === buttonSection ? "bg-[#7222B0]" : ""
    } rounded-md p-2 hover:bg-opacity-[20%] bg-opacity-[25%]`;

  return (
    <div className="flex flex-col h-max w-max gap-2">
      <button
        onClick={() => handleOnclick("projectStatus")}
        className={getButtonStyle("projectStatus")}
      >
        <RiMenuSearchLine className="h-8 w-8" />
      </button>
      <button
        onClick={() => handleOnclick("Offers")}
        className={getButtonStyle("Offers")}
      >
        <FaHandHolding className="h-8 w-8" />
      </button>
      <button
        onClick={() => handleOnclick("inbox")}
        className={getButtonStyle("inbox")}
      >
        <MdOutlineInbox className="h-8 w-8" />
      </button>
      {IsSeller && (
        <button
          onClick={() => handleOnclick("request")}
          className={getButtonStyle("request")}
        >
          <PiPhoneCall className="h-8 w-8" />
        </button>
      )}
    </div>
  );
}

export default AsideOptions;
