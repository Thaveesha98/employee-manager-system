import React, { useState, useEffect } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Card() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/employee`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
      });
  }, []);

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_API_BASE_URL}/employee/${id}`
        );
        setData((prevData) =>
          prevData.filter((employee) => employee.id !== id)
        );
      } catch (error) {
        console.error("Error during deletion:", error);
        setError(error);
      }
    }
  };

  const handelEditClick = (id) => {
    navigate(`/employee/edit/${id}`);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="bg-slate-50">
      <div className="flex flex-wrap justify-center w-full">
        {data.map((employee) => (
          <div
            key={employee.id}
            className="m-4 p-6 bg-white rounded-md shadow-md w-[15%] max-sm:w-[80%]  max-sm:block  max-md:w-[40%]  max-lg:w-[40%] ... hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out "
          >
            <div className="mb-4 flex justify-center">
              <img
                src={employee.photo}
                className="w-full h-[200px] rounded-md"
                alt={`${employee.first_name} ${employee.last_name}`}
              />
            </div>
            <div className="w-auto">
              <p className="text-lg font-semibold max-md:text-base md:text-base">
                {`${employee.first_name} ${employee.last_name}`}
              </p>

              <p className="text-gray-600 text-xs underline max-md:text-xs md:text-[0.7rem] ">
                {employee.email}
              </p>

              <p className="text-gray-600">{employee.number}</p>
              <p className="text-gray-600">
                {employee.gender === "F" ? "Female" : "Male"}
              </p>
            </div>
            <div className="mt-[-23px] space-x-2 justify-end flex ">
              <button
                className="bg-red-500 text-white p-2 rounded-full ... hover:scale-105 transition-transform duration-300 ease-in-out"
                onClick={() => handleDeleteClick(employee.id)}
              >
                <MdOutlineDeleteOutline />
              </button>
              <button
                className="bg-green-500 text-white  p-2 rounded-full ... hover:scale-105 transition-transform duration-300 ease-in-out"
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
