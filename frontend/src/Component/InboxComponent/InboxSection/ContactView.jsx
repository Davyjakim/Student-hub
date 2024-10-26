import React, { useContext } from "react";
import { CgProfile } from "react-icons/cg";
import { InboxContext } from "../../../pages/InboxPage";
function ContactView(props) {
  const { name, handleOnclick } = props;
  const { setToogle } = useContext(InboxContext);
  return (
    <div>
      <div
        onClick={() => {
          setToogle(false);
          handleOnclick();
        }}
        className="flex hover:bg-slate-300 rounded-xl gap-2 py-3  items-center border-b"
      >
        <CgProfile className="h-10 w-10" />
        <div>{name}</div>
      </div>
    </div>
  );
}

export default ContactView;
