import React, { useContext } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { chatContext } from "./Body";
function ChatBoxHeader() {
  const {Contact}= useContext(chatContext)
  return (
    <div className="bg-slate-300 rounded-tr-md h-max gap-2 flex items-center">
      {/* profile picture */}
      <div className="h-10 w-10 ">
        <IoPersonCircleOutline className="h-full w-full" />
      </div>
      {/* Name */}
      <div>{Contact.name}</div>
    </div>
  );
}

export default ChatBoxHeader;
