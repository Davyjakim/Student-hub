import React from "react";
import { LiaSearchSolid } from "react-icons/lia";
function AddFriendFrame(Props) {
  const { SetisAddFriend } = Props;
  return (
    <div
      onClick={() => {
        SetisAddFriend(false)
      }}
      className="fixed top-0 right-0 flex items-center justify-center z-10 bg-slate-200   min-h-screen w-screen  "
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="min-h-[300px] z-20 bg-white flex justify-center items-center w-max min-w-[400px] "
      >
        <div className="flex h-max  gap-3 border w-max rounded-md p-2">
          <LiaSearchSolid className="w-8 h-8" />
          <input
            type="text"
            className="border-none outline-none w-full bg-transparent"
            placeholder="Search for a friend by name"
          />
        </div>
      </div>
    </div>
  );
}

export default AddFriendFrame;
