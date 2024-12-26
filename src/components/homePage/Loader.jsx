import React from "react";

function Loader() {
  return (
    <div className="flex justify-center items-center mt-[20%] mb-[80%]">
      <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 rounded-full border-t-transparent border-blue-500"></div>
    </div>
  );
}

export default Loader;
