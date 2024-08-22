import React, { useContext } from "react";
import { chatContext } from "../Body";

function Receive(props) {
    const { message } = props;

    const {formatDate}=useContext(chatContext)
  return (
    <div>
      <div className="max-w-[50%] w-max whitespace-normal break-words text-sm bg-[#98A2B3] text-white p-2 rounded-r-2xl  rounded-t-2xl   shadow ">
        {message.message}
      </div>
      <div className="sm:text-[10px] md:text-sm">
        {formatDate(message.time)}
      </div>
    </div>
  );
}

export default Receive;
