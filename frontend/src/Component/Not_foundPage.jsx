import React from "react";

function Not_foundPage() {
  return (
    <div className="bg-slate-900">
    <div className="flex flex-col relative items-center min-h-screen justify-center">
      <div className="relative text-center">
        <span className="text-[30px] font-bold text-white">Page Not Found!</span>
        <div className="absolute outline-404 top-[-150px] text-opacity-50 text-white text-[150px] font-bold left-[-5px]">404</div>
        
      </div>
      <button
          onClick={() => (window.location.href = window.location.origin)}
          className="mt-8 px-6 py-2 border  text-white font-semibold rounded hover:bg-gray-600 transition duration-200"
        >
          Go Back home
        </button>
    </div>
  </div>
  
  );
}

export default Not_foundPage;
