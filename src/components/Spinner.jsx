import React from "react";

function Spinner() {
  return (
    <div className="w-full h-full bg-black bg-opacity-85 text-center absolute flex justify-center items-center flex-col z-50">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-accent"></div>
      <h2 className="text-zinc-900 dark:text-white mt-4">Loading...</h2>
      <p className="text-zinc-900 dark:text-white">
        Your adventure is about to begin
      </p>
    </div>
  );
}

export default Spinner;