import React, { useContext } from "react";
import ContactPart from "./ContactPart";
import FooterChat from "./FooterChat";
import ChatBody from "./ChatBody";
import Chatheader from "./Chatheader";
import { InboxContext } from "../../../pages/InboxPage";
function InboxFrame() {
  const {ToogleInboxContacts,Room, setToogle}=useContext(InboxContext)
  return (
    <div className="flex  gap-2">
      <div className={` sm:block w-full  xs:${ToogleInboxContacts?'block':'hidden'} `}>
      <ContactPart/>
      </div>

      {Room&&<div className={`h-full sm:block xs:${!ToogleInboxContacts?"block ":"hidden"} w-full`}>
        <Chatheader  />
        <ChatBody />
        <FooterChat />
      </div>}
    </div>
  );
}

export default InboxFrame;
