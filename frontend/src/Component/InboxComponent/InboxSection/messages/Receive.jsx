import React from "react";

function Receive(props) {
    const { message } = props;
  return (
    <div>
      <div className="w-max bg-[#98A2B3] text-white mb-2 p-2 rounded-r-2xl  rounded-t-2xl   shadow ">
        {message}
      </div>
    </div>
  );
}

export default Receive;
