import React from "react";
import NavBar from "./Component/NavBar";
import Body from "./Component/Body";

function App() {

  return (
    <div className="max-h-screen overflow-hidden flex flex-col max-w-screen p-1">
      <NavBar/>
      <Body />
    </div>
  );
}

export default App;
