import React, { useState, useEffect } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Table() {
  const [employeeData, setEmployeeData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Make a GET request to your backend API endpoint
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/employee`)
      .then((response) => {
        // Update the state with the fetched data
        setEmployeeData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/employee/${id}`
      );
      setEmployeeData((prevData) =>
        prevData.filter((employee) => employee.id !== id)
      );
    } catch (error) {
      console.error("Error during deletion:", error);
    }
  };

  const handelEditClick = (id) => {
    navigate(`/employee/edit/${id}`);
  };

  return (
    <div className="w-full max-sm:w-full">
      <div className="mx-auto flex justify-between md:w-[95%] max-sm:w-[98%] max-sm:overflow-x-scroll max-sm:mx-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-green-300 border border-green-500">
              <th className="w-[80px] h-[50px]">Image</th>
              <th className="bg-green-300 border border-green-500">
                First Name
              </th>
              <th className="bg-green-300 border border-green-500">
                Last Name
              </th>
              <th className="bg-green-300 border border-green-500">Email</th>
              <th className="bg-green-300 border border-green-500">Phone</th>
              <th className="bg-green-300 border border-green-500">Gender</th>
              <th className="bg-green-300 border border-green-500 ">Action</th>
            </tr>
          </thead>
          <tbody className="border border-green-400">
            {employeeData.map((employee) => (
              <tr className="border border-green-400" key={employee.id}>
                <td>
                  <img
                    className="mx-auto justify-center items-center"
                    src={employee?.photo}
                    alt={`Profile of ${employee.first_name} ${employee.last_name}`}
                    style={{
                      width: "80px",
                      height: "80px",
                    }}
                  />
                </td>
                <td className="border border-green-400">
                  {employee.first_name}
                </td>
                <td className="border border-green-400">
                  {employee.last_name}
                </td>
                <td className="border border-green-400">{employee.email}</td>
                <td className="border border-green-400">{employee.number}</td>
                <td className="border border-green-400">
                  {employee.gender === "F" ? "Female" : "Male"}
                </td>
                <td className="flex pt-[14%] max-sm:mx-[1%] max-sm:mt-[28%] max-sm:space-x-2 items-center justify-center space-x-3">
                  <button
                    className="p-[6%] max-sm:py-[5%] rounded-lg text-sm text-white bg-gray-600 shadow-md duration-200 hover:bg-blue-200 focus:outline-none focus:bg-purple-600"
                    onClick={() => handelEditClick(employee.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="p-[7%] max-sm:py-[7%] rounded-lg w-[36px] text-white bg-red-600 shadow-md duration-200 hover:bg-red-200 focus:outline-none focus:bg-purple-600"
                    onClick={() => handleDeleteClick(employee.id)}
                  >
                    <MdOutlineDeleteOutline />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
