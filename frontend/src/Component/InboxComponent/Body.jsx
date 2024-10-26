import React, { useContext } from "react";
import { InboxContext } from "../../pages/InboxPage";
import InboxFrame from "./InboxSection/InboxFrame";


const sections = {
  inbox: <div><InboxFrame/></div>,
  projectStatus: <div>project status</div>,
  Offers: <div>offers</div>,
  request: <div>request</div>,
};

function Body() {
 const {section}=useContext(InboxContext)

  return <div className="flex-grow">{sections[section]}</div>;
}

export default Body;
