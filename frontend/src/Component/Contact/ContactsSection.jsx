import React from "react";
import ContactView from "./ContactView";
function ContactsSection(props) {
  const { setisOpen } = props;
  return (
    <div className="h-full border border-[#EAECF5] rounded-[20px]">
      <div>
        <ContactView setisOpen={setisOpen} />
        <ContactView setisOpen={setisOpen} />
        <ContactView setisOpen={setisOpen} />
      </div>
    </div>
  );
}

export default ContactsSection;
