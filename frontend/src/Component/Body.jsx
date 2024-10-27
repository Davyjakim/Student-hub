import React, {
  useState,
  useEffect,
  createContext,
  useMemo,
  useContext,
} from "react";

import ChatBoxHeader from "./ChatBoxHeader";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import Contacts from "./Contacts";
import io from "socket.io-client";
import NavBar from "./NavBar";
import DefaultChatBody from "./DefaultChatBody";
import { AuthContext } from "..";
import UserService from "../ApiService/UserService";
import EmojiPicker from "emoji-picker-react";
import {  Url } from "../ApiService/ApiClient";
export const chatContext = createContext();

const contactShape = " sm:h-[448px] lg:h-[598px]  md:h-[548px]";
const ChatBodyShape =
  "sm:h-[350px] lg:h-[500px]  md:h-[450px] h-full p-2 w-full";

function Body() {
  const [currentMessage, setCurrentMessage] = useState("");
  const [MessageList, setMessageList] = useState([]);
  const [Contact, setContact] = useState({});
  const { authtoken, userdetails } = useContext(AuthContext);
  const [Room, setRoom] = useState(""); // TODO setDault room
  const [friends, setFriends] = useState([]);
  const [audioURL, setAudioURL] = useState("");
  const [duration, setDuration] = useState(0);
  const [TotalUnread, setTotalUnread] = useState(0);
  const [showEmojis, setshowEmojis] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchfreinds = async () => {
      try {
        const { friends, freindsfetchError } = await UserService.getfriends();
        setFriends(friends);
      } catch (error) {}
    };
    fetchfreinds();
  }, []);

  const socket = useMemo(
    () =>
      io.connect(Url, {
        extraHeaders: {
          "x-auth-token": authtoken,
        },
      }),
    [authtoken]
  );

  const handleOnSendMessage = async () => {
    if (currentMessage !== "" && Room !== "" && audioURL === "") {
      const messageData = {
        Room: Room,
        SentBy: userdetails._id,
        ReceivedBy: Contact.id,
        content: currentMessage,
        isRead: false,
        isAudio: false,
        timestamp: new Date(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
      console.log("handleOnSendMessage just called");
    }
    if (Room !== "" && audioURL !== "") {
      const messageData = {
        Room: Room,
        SentBy: userdetails._id,
        ReceivedBy: Contact.id,
        content: audioURL,
        isAudio: true,
        isRead: false,
        duration: duration,
        timestamp: new Date(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setDuration("");
      setAudioURL("");
      console.log("handleOnSendMessage just called");
    }
  };
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      // If the date is today, show only the hour
      return `today, ${date.getHours()}:${date.getMinutes()}`;
    } else if (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    ) {
      // If the date is yesterday, show "yesterday"
      return "Yesterday, " + date.getHours() + ":" + date.getMinutes();
    } else {
      // If the date is older, show the full date
      return `${date.toLocaleDateString()}, ${date.getHours()}:${date.getMinutes()}`;
    }
  };
  const contextValue = useMemo(
    () => ({
      currentMessage,
      MessageList,
      Room,
      Contact,
      friends,
      socket,
      audioURL,
      duration,
      showEmojis,
      contactShape,
      ChatBodyShape,
      isOpen,TotalUnread, setTotalUnread,
      setIsOpen,
      setFriends,
      setshowEmojis,
      setDuration,
      setAudioURL,
      formatDate,
      setContact,
      setCurrentMessage,
      setMessageList,
      setRoom,
      handleOnSendMessage,
    }),
    [currentMessage, Contact,TotalUnread, friends, MessageList, audioURL, duration, Room]
  );

  useEffect(() => {
    socket.emit("join_room", Room);
    socket.on("NewChatlist", (data) => {
      setMessageList(data);
    });
  }, [Room]);
  useEffect(() => {
    const receiveMessage = (data) => {
      console.log(data);
      if (data.Room === Room) {
        setMessageList((list) => [...list, data]);
      }
    };

    socket.on("receive_message", receiveMessage);
    return () => {
      socket.off("receive_message", receiveMessage);
    };
  }, [MessageList]);

  useEffect(() => {
    socket.on("Friends", (data) => {
      setFriends(data);
      console.log(data);
    });

    return () => {
      socket.off("Friends", (data) => {
        setFriends(data);
      });
    };
  }, [MessageList]);

  return (
    <chatContext.Provider value={contextValue}>
      <div className=" h-screen max-h-screen  overflow-y-scroll flex flex-col max-w-screen p-1">
        <div className="h-max">
          <NavBar />
        </div>
        <div className=" flex-grow flex ">
          <div className="relative w-full h-max  grid-rows-1 grid grid-cols-12 ">
            <div
              className={` md:col-span-4 md:block sm:${
                isOpen ? "hidden" : " block col-span-12 "
              } `}
            >
              <Contacts />
            </div>
            {Room === "" ? (
              <DefaultChatBody />
            ) : (
              <div
                className={` h-full md:block md:col-span-8 flex sm:${
                  !isOpen ? "hidden" : " block col-span-12 "
                } flex-col rounded-r-md `}
              >
                <div className="">
                  <ChatBoxHeader />
                </div>
                <div className="  h-max ">
                  <ChatBody />
                </div>
                <div className=" h-full w-full bottom-0 ">
                  <ChatFooter />
                </div>
                {showEmojis && (
                  <div className=" absolute bottom-12 right-1 h-max w-max">
                    <div className="bg-slate-300 w-full h-full transform origin-bottom-right scale-50 sm:scale-50 md:scale-90 lg:scale-100 z-10">
                      <EmojiPicker
                        width={300}
                        height={400}
                        size={20}
                        onEmojiClick={(e, em) => {
                          setCurrentMessage((p) => p + e.emoji);
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </chatContext.Provider>
  );
}

export default Body;
