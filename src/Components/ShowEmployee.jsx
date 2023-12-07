import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Table from "./Table";
import Card from "./Card";

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
    <div>
      <div className="px-5 py-2  ml-auto justify-end flex space-x-2">
        <button
          className="w-[15%] py-2   rounded-3xl text-white bg-blue-600 shadow-md duration-200 hover:bg-blue-200 focus:outline-none focus:bg-purple-600"
          onClick={() => navigate("/employee/add")}
        >
          Add Employee
        </button>
        <button
          className=" text-white  p-3 rounded-full bg-blue-600 shadow-md duration-200 hover:bg-blue-200 focus:outline-non"
          onClick={handleGridView}
        >
          <IoMenu />
        </button>
      </div>
      {isActive === false ? <Table /> : <Card />}
    </div>
  );
}

export default ShowEmployee;
