import React, { useContext, useState } from "react";
import Receive from "./messages/Receive";
import Sent from "./messages/Sent";
import { chatContext } from "./Body";
import { AuthContext } from "..";
import AudioPlayer from "./messages/AudioPlayer";
import EmojiPicker from "emoji-picker-react";
function ChatBody() {
  const { userdetails } = useContext(AuthContext);
  const { MessageList, formatDate, ChatBodyShape, setCurrentMessage } =
    useContext(chatContext);

  return (
    <div className={`bg-slate-400 relative flex flex-col-reverse ${ChatBodyShape}  overflow-y-scroll `}>
      <div className="flex flex-col w-full">
        {MessageList.map((m, index) => {
          const messageDate = new Date(m.timestamp);
          return (
            <div key={index}>
              {!m.isAudio ? (
                m.SentBy === userdetails._id ? (
                  <Sent message={{ message: m.content, time: messageDate }} />
                ) : (
                  <Receive
                    message={{ message: m.content, time: messageDate }}
                  />
                )
              ) : m.SentBy === userdetails._id ? (
                <div className="  w-full h-full flex justify-end  ">
                  <div className=" max-w-[50%] w-max ">
                    <AudioPlayer
                      isReviewing={false}
                      isAudSent={true}
                      timestap={formatDate(messageDate)}
                      src={m.content}
                      duration={m.duration}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="max-w-[50%] w-max ">
                    <AudioPlayer
                      isReviewing={false}
                      isAudSent={false}
                      timestap={formatDate(messageDate)}
                      src={m.content}
                      duration={m.duration}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
     
    </div>
  );
}

export default ChatBody;
