import React, { useContext, useEffect, useState } from "react";
import { LiaSearchSolid } from "react-icons/lia";
import { IoPersonCircleOutline } from "react-icons/io5";
import { AuthContext } from "..";
import { chatContext } from "./Body";
import { CiCirclePlus } from "react-icons/ci";
import AddFriendFrame from "./AddFriendFrame";
function Contacts() {
  // const { friends } = useContext(AuthContext);
  const {
    setRoom,
    socket,
    Contact,
    Room,
    formatDate,
    contactShape,
    friends,
    setContact,
    setIsOpen,
    setMessageList,
  } = useContext(chatContext);
  const { userdetails } = useContext(AuthContext);
  const [currentSearch, setCurrentSearch] = useState("");
  const [isAddFriend,SetisAddFriend]= useState(false);
  //  socket.on("message_in_room",joinRoom)

  useEffect(() => {
    socket.emit("requestChatList", Room);

    socket.on("chatList", (messages) => {
      setMessageList(messages);
    });
    return () => {
      socket.off("chatList");
    };
  }, [Contact, Room, socket, setMessageList]);

  // console.log(friends[1]?.unreadMessages[friends[1]?.unreadMessages.length-1].SentBy)

  //unreadMessages[friends.friend.unreadMessages.length - 1].SentBy !== userdetails._id

  return (
    <div
      id="Contact_container"
      className={`bg-gray-500 relative lg:text-lg md:text-base sm:text-sm p-2 rounded-l-md ${contactShape}`}
    >
     {
      isAddFriend&&<div><AddFriendFrame SetisAddFriend={SetisAddFriend}/></div>
     }
      {/* Search */}
     <div className="flex relative ">
     <div className="flex relative items-center mb-3 gap-1 rounded-sm border-b p-1  shadow-lg bg-[#EAECF5] w-full">
        <div className="min-h-5 min-w-5">
          <LiaSearchSolid className="w-full h-full" />
        </div>
        <input
          type="text"
          className=" placeholder:text-sm bg-transparent focus:outline-none focus:ring-0"
          placeholder="search by name"
          value={currentSearch}
          onChange={(e) => {
            setCurrentSearch(e.target.value);
          }}
        />
        <div className=" absolute bg-white z-10 rounded-lg  w-full top-full mt-1  left-0">
          {/* <div
            className="bg-white h-3 w-full "
          
          ></div> */}
          {/* <div className="absolute bottom-0 right-0 transform translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-r-[6px] border-r-[#7F56D9] border-b-[7px] border-b-transparent"></div> */}
          {friends
            .filter(
              (fr) =>
                currentSearch &&
                fr.friend.friendName
                  .toLowerCase()
                  .includes(currentSearch.toLowerCase())
            )
            .map(
              (fr, i) =>
                currentSearch !== fr.friend.friendName && (
                  <div
                    className={` hover:bg-slate-400 px-3 rounded-md py-0.5 m-1 `}
                    onClick={() => {
                      setCurrentSearch(fr.friend.friendName);
                    }}
                    key={i}
                  >
                    {fr.friend.friendName}
                  </div>
                )
            )}
        </div>
      </div>
      <div onClick={()=>{
        SetisAddFriend(true)
      }} className="flex h-max mt-1 rounded-md " >
       
        <CiCirclePlus className="h-7 w-7" />
      </div>
     </div>

      {/* Contacts */}

      {friends.length !== 0 &&
        friends
          .filter((fr) =>
            currentSearch
              ? fr.friend.friendName
                  .toLowerCase()
                  .includes(currentSearch.toLowerCase())
              : fr
          )
          .map((el) => (
            <div
              key={el.friend.id}
              onClick={() => {
                if (Room) {
                  socket.emit("leavePreviousRoom", Room);
                }
                setRoom(el.friend.ChatRoom);
                if (el.friend.friendName !== Contact.name) {
                  setContact({ name: el.friend.friendName, id: el.friend.id });
                }
                setIsOpen(true);
              }}
              className="flex gap-2 relative rounded-[4px] hover:bg-opacity-50 hover:bg-slate-100 w-full"
            >
              <div className="min-h-10 min-w-10">
                <IoPersonCircleOutline className="h-full w-full" />
              </div>
              <div className="w-full flex flex-col gap-0">
                <div className="flex justify-between pr-1 ">
                  <div className="font-semibold sm:text-sm">
                    {el.friend.friendName}
                  </div>
                  <div className="text-xs md:text-[12px] sm:text-[8px]">
                    {el.chatList && el.chatList.length > 0
                      ? `${formatDate(
                          el.chatList[el.chatList.length - 1].timestamp
                        )}`
                      : ""}
                  </div>
                </div>
                <div className="text-xs flex justify-between ">
                  <div className="text-xs">
                    {el.chatList &&
                      el.chatList.length > 0 &&
                      (!el.chatList[el.chatList.length - 1].isAudio
                        ? el.chatList[el.chatList.length - 1].content
                          ? el.chatList[el.chatList.length - 1].content.length >
                            20
                            ? `${el.chatList[
                                el.chatList.length - 1
                              ].content.slice(0, 20)}`
                            : el.chatList[el.chatList.length - 1].content
                          : ""
                        : "Audio")}
                  </div>
                </div>
                {friends &&
                  userdetails &&
                  el.unreadMessages &&
                  el.unreadMessages.length > 0 && (
                    <div className="absolute right-0 top-4">
                      {el.unreadMessages[el.unreadMessages.length - 1]
                        ?.SentBy !== userdetails._id && (
                        <div className="bg-red-500 font-bold text-white rounded-full sm:text-[10px] md:text-sm shadow-lg w-4 h-4 flex items-center justify-center">
                          {el.unreadMessages.length}
                        </div>
                      )}
                    </div>
                  )}
              </div>
            </div>
          ))}
    </div>
  );
}

export default Contacts;
