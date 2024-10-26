import React from "react";
import { IoMdAttach } from "react-icons/io";
import { BsEmojiSmile } from "react-icons/bs";
import { AiFillAudio } from "react-icons/ai";
import { LuSendHorizonal } from "react-icons/lu";

const iconSize = " min-h-6 h-full  w-6";
function FooterChat() {
  return (
    <div className="h-[40px]">
      <div className="flex bg-[#EAECF5] rounded-[20px] px-2 h-full items-center gap-1">
        <AiFillAudio className={`${iconSize}  `} />

        <div className="w-full h-full">
          <textarea
            name="message"
            className="w-full h-full pt-2 focus:outline-none bg-transparent resize-none"
            id="message"
            placeholder="message..."
          />
        </div>
        <BsEmojiSmile className={`${iconSize}`} />
        <IoMdAttach className={`${iconSize}`} />
        <LuSendHorizonal className={`${iconSize}`} />
      </div>
    </div>
  );
}

export default FooterChat;
