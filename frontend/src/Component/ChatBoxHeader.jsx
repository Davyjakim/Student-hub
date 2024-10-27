import React, { useContext } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { chatContext } from "./Body";
import { IoIosArrowBack } from "react-icons/io";
function ChatBoxHeader() {
  const { Contact,isOpen,setIsOpen,Room,   socket, } = useContext(chatContext);
  return (
    <div className="bg-slate-300 p-1 rounded-tr-md h-max gap-2 flex items-center">
      {/* profile picture */}
      <div onClick={()=>{
        if (Room) {
          socket.emit("leavePreviousRoom", Room);
        }
        setIsOpen(false)
      }} className={`flex items-center rounded-full  sm:border md:border-none`}>
        <IoIosArrowBack className={`h-6 md:hidden sm:${!isOpen?"hidden":"block"} w-6 `} />
        <IoPersonCircleOutline className="h-10 w-10" />
      </div>

      {/* Name */}
      <div>{Contact.name}</div>
    </div>
  );
}

export default ChatBoxHeader;
