import React, { useState, useEffect } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { IoMenu } from "react-icons/io5";

function Card() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/employee`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/employee/${id}`
      );
      setData((prevData) => prevData.filter((employee) => employee.id !== id));
    } catch (error) {
      console.error("Error during deletion:", error);
    }
  };

  const handelEditClick = (id) => {
    navigate(`/employee/edit/${id}`);
  };

  return (
    <div>
      <div className="flex flex-wrap justify-center">
        {data.map((employee) => (
          <div
            key={employee.id}
            className="max-w-md m-4 p-6 bg-white rounded-md shadow-md"
          >
            <div className="mb-4 flex justify-center">
              <img
                src={employee.photo}
                className="w-full h-[200px] rounded-md"
                alt={`${employee.first_name} ${employee.last_name}`}
              />
            </div>
            <div>
              <p className="text-lg font-semibold">
                {`${employee.first_name} ${employee.last_name}`}
              </p>
              <p className="text-gray-600">{employee.email}</p>
              <p className="text-gray-600">{employee.number}</p>
              <p className="text-gray-600">
                {employee.gender === "F" ? "Female" : "Male"}
              </p>
            </div>
            <div className="mt-[-23px] space-x-2 justify-end flex">
              <button
                className="bg-red-500 text-white p-2 rounded-full"
                onClick={() => handleDeleteClick(employee.id)}
              >
                <MdOutlineDeleteOutline />
              </button>
              <button
                className="bg-green-500 text-white  p-2 rounded-full"
                onClick={() => handelEditClick(employee.id)}
              >
                <FaUserEdit />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;
