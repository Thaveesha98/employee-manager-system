import React from "react";

function NavBar() {
  return (
    <div className="bg-blue-600 flex py-[0.5%] w-full">
      <div className="text-white pl-[1%]">Employee Manager</div>
      <div className="flex space-x-4  ml-auto px-[2%] items-end">
        {/* <button>Grid View</button>
        <button>Grid View</button> */}
      </div>
    </div>
  );
}

export default NavBar;
