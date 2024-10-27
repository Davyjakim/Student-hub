import React from "react";

function Sent(props) {
  const { message } = props;
  return (
    <div className="flex justify-end">
      <div className="w-max bg-[#7F56D9] mb-2 text-white text-end p-2 rounded-t-2xl rounded-l-2xl shadow">
        {message}
      </div>
    </div>
  );
}

export default Sent;
