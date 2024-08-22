import React, { useContext } from "react";
import { chatContext } from "../Body";

function Sent(props) {
  const { message } = props;
  const {formatDate}=useContext(chatContext)
  return (
    <div className=" ">
      <div className="flex w-full text-sm flex-col items-end justify-end">
        <div className=" max-w-[50%] w-max whitespace-normal break-words bg-[#7F56D9] text-white text-end p-2 rounded-t-2xl rounded-l-2xl shadow">
          {message.message}
        </div>
        <div className="sm:text-[10px] md:text-sm text-end">{formatDate(message.time)}</div>
      </div>
      
    </div>
  );
}

export default Sent;
