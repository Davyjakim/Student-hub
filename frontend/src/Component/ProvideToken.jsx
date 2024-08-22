import React, { useState } from "react";

function ProvideToken(props) {
  const { setisopen } = props;
  const [token, settoken] = useState("");
  return (
    <div className="fixed z-10 flex items-center justify-center h-screen w-screen bg-black bg-opacity-20">
      <div className="relative flex items-center  bg-white h-[20%] w-[50%]">
        <div className="px-2 border rounded-md mx-3">
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setisopen(false);
              
              }
            }}
            value={token}
            onChange={(e) => {
              settoken(e.target.value);
            }}
            type="text"
            className="focus:outline-none"
            placeholder="enter token"
          />
        </div>
        <div
          onClick={() => {
            setisopen(false);
          }}
          className="absolute top-0 right-0"
        >
          close
        </div>
      </div>
    </div>
  );
}

export default ProvideToken;
