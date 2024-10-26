import React, { useContext } from "react";
import { CgProfile } from "react-icons/cg";
import ContactView from "./ContactView";
import { InboxContext } from "../../../pages/InboxPage";
function ContactPart() {
  const { Room, setRoom } = useContext(InboxContext);
  console.log(Room);

  const handleclick=(room) => {
    if(Room){
      // leave the room before joining another room
    }
    setRoom(room);
    console.log(Room);
  }
  return (
    <div className="xs:h-[440px] p-1 ss:h-[540px] min-w-[150px] border rounded-[20px]  md:h-[590px]">
      <ContactView
        name="jakim"
        handleOnclick={() => handleclick("11")}
      />
      <ContactView
        name="davy"
        handleOnclick={() => handleclick("12")}
      />
    </div>
  );
}

export default ContactPart;
