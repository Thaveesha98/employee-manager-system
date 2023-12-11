import React, { useState } from "react";
// import { IoMenu } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Table from "./Table";
import Card from "./Card";
import { IoMdGrid } from "react-icons/io";
import { LuTableProperties } from "react-icons/lu";

function ShowEmployee() {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(true);

  const handleGridView = () => {
    if (isActive === false) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };
  //   console.log(isActive);
  return (
    <div className="bg-slate-50">
      <div className="px-5 py-2  ml-auto justify-end flex space-x-2">
        <button
          className="w-[15%] py-2   rounded-3xl text-white bg-blue-600 shadow-md duration-200 hover:bg-blue-200 focus:outline-none focus:bg-purple-600 max-sm:w-[35%] max-sm:text-xs max-sm:p-[1%] max-sm:h-[25px] max-md:w-[20%] max-md:text-sm max-md:p-[1%] "
          onClick={() => navigate("/employee/add")}
        >
          Add Employee
        </button>
        <button
          className=" text-white  p-3 rounded-full bg-blue-600 shadow-md duration-200 hover:bg-blue-200 focus:outline-non  max-sm:p-[1%] max-sm:w-[9%] max-sm:flex max-sm:justify-center max-sm:mx-auto max-sm:pt-[1.5%]  max-md:w-[6%] max-md:flex max-md:justify-center max-md:mx-auto "
          onClick={handleGridView}
        >
          {isActive === false ? <IoMdGrid /> : <LuTableProperties />}
        </button>
      </div>
      {isActive === false ? <Table /> : <Card />}
    </div>
  );
}

export default ShowEmployee;
