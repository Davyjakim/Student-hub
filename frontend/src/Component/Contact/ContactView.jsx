import React from "react";
import { CgProfile } from "react-icons/cg";

function ContactView(props) {
const {setisOpen}=props

  return (
    <div className="p-2 border-b rounded-md hover:bg-[#EAECF5] border-b-[#EAECF5]" onClick={()=>{
      setisOpen(false)
    }}>
      <div className="flex relative flex-col ">
        <div className="absolute top-0 right-0">date</div>
        <div className="flex items-center gap-5">
          <div>
            <CgProfile size={40} />
          </div>
          <div>name</div>
        </div>
      </div>
    </div>
  );
}

export default ContactView;
