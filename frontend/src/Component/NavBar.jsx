import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { RiMessage3Line } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { AuthContext } from "..";
import { LuMenu } from "react-icons/lu";
import { chatContext } from "./Body";
function NavBar() {
  const { userdetails, logout } = useContext(AuthContext);
  const { setMessageList,setFriends,TotalUnread } = useContext(chatContext);
  const [isMenu, setIsMenu] = useState(false);

  return (
    <div className="h-full relative">
      <nav className="flex items-center justify-between h-full p-2">
        <div className="text-2xl">Student Hub</div>
        <div className=" sm:hidden md:flex gap-2">
          <NavLink
            to="/"
            className={`flex active:text-blue-400  items-center gap-2`}
          >
            <MdOutlineCalendarMonth size={30} />
            <div>My Schedule</div>
          </NavLink>
          <NavLink
            to="/"
            className="flex relative active:text-blue-400 items-center gap-2"
          >
            <RiMessage3Line size={30} />
            <div>Inbox</div>
            {TotalUnread>0&&<div className="absolute bg-red-600 w-max h-max px-1 text-xs font-bold text-white bottom-4  rounded-full">
              {TotalUnread}
            </div>}
          </NavLink>
          <button className="flex active:text-blue-400 items-center gap-2">
            <CgProfile size={30} />
            <div>{userdetails.name}</div>
          </button>
          <div
            className="flex items-center border-l rounded-md pl-2"
            onClick={() => {
              setMessageList([]);
              setFriends([])
              logout();
            }}
          >
            log out
          </div>
        </div>
        <LuMenu
          onClick={() => {
            setIsMenu(!isMenu);
          }}
          className="h-5 w-5 sm:block md:hidden"
        />
        {isMenu && (
          <div className="flex sm:flex md:hidden border absolute right-2 z-10 bg-white p-2 top-[45px] rounded-lg flex-col gap-2">
            <NavLink
              to="/"
              className={`flex active:text-blue-400  items-center gap-2`}
            >
              <MdOutlineCalendarMonth size={30} />
              <div>My Schedule</div>
            </NavLink>
            <NavLink
              to="/"
              className="flex active:text-blue-400 items-center gap-2"
            >
              <RiMessage3Line size={30} />
              <div>Inbox</div>
            </NavLink>
            <button className="flex active:text-blue-400 items-center gap-2">
              <CgProfile size={30} />
              <div>{userdetails.name}</div>
            </button>
            <div
              className="flex items-center border-l rounded-md pl-2"
              onClick={() => {
                setMessageList([]);
                logout();
              }}
            >
              log out
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

export default NavBar;
