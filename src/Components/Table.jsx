import React, { useState, useEffect } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { IoMenu } from "react-icons/io5";

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
    <div>
      <div className="mx-auto flex justify-center">
        <table className="w-[80%]">
          <thead>
            <tr className="bg-green-300 border border-green-500">
              <th>Image</th>
              <th className="bg-green-300 border border-green-500">
                First Name
              </th>
              <th className="bg-green-300 border border-green-500">
                Last Name
              </th>
              <th className="bg-green-300 border border-green-500">Email</th>
              <th className="bg-green-300 border border-green-500">Phone</th>
              <th className="bg-green-300 border border-green-500">Gender</th>
              <th className="bg-green-300 border border-green-500">Action</th>
            </tr>
          </thead>
          <tbody className="border border-green-400">
            {employeeData.map((employee) => (
              <tr className="border border-green-400" key={employee.id}>
                <tr>
                  <img
                    src={employee?.photo}
                    alt={`Profile of ${employee.first_name} ${employee.last_name}`}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                </tr>
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
                <th className="space-x-3">
                  <button
                    className=" p-2 rounded-lg text-sm text-white bg-gray-600 shadow-md duration-200 hover:bg-blue-200 focus:outline-none focus:bg-purple-600"
                    onClick={() => handelEditClick(employee.id)}
                  >
                    Edit
                  </button>
                  <button
                    className=" p-2   rounded-lg w-[32px]  text-white bg-red-600 shadow-md duration-200 hover:bg-red-200 focus:outline-none focus:bg-purple-600"
                    onClick={() => handleDeleteClick(employee.id)}
                  >
                    <MdOutlineDeleteOutline />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
