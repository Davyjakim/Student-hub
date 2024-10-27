import React, { useContext } from "react";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowBack } from "react-icons/io";
import { InboxContext } from "../../../pages/InboxPage";
function Chatheader() {
  const { setToogle, Room, ToogleInboxContacts } = useContext(InboxContext);
  return (
    <div className=" h-full w-full flex ">
      <div className="flex items-center gap-3">
        <div className="flex items-center">
          <IoIosArrowBack
            onClick={() => {
              setToogle(true);
              if(Room){
                //leave the room
              }
            }}
            className="h-6 w-6 sm:hidden xs:block"
          />
          <div
            className={`flex gap-2 md:border-none rounded-full border-[#EAECF5]`}
          >
            <CgProfile size={40} />
          </div>
        </div>

        <div>Name</div>
      </div>
    </div>
  );
}

export default Chatheader;
