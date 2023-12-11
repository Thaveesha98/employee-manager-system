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
    <div className="w-full max-sm:w-fullbg-slate-50">
      <div className="mx-auto flex justify-between md:w-[95%] max-sm:w-[98%] max-sm:overflow-x-scroll max-sm:mx-auto ">
        <table className="w-full overflow-hidden rounded-[0.200em] border-green-300 ">
          <thead>
            <tr className="bg-green-300 border border-green-500">
              <th className="w-[80px] ">Image</th>
              <th className="bg-green-300 border border-green-500 px-[1%]">
                First Name
              </th>
              <th className="bg-green-300 border border-green-500 ">
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
              <tr className="border border-green-400 " key={employee.id}>
                <td>
                  <img
                    className="mx-auto justify-center items-center rounded-full "
                    src={employee?.photo}
                    alt={`Profile of ${employee.first_name} ${employee.last_name}`}
                    style={{
                      width: "40px",
                      height: "40px",
                    }}
                  />
                </td>
                <td className="border border-green-400 p-[1%]  max-sm:text-sm max-sm:p-1">
                  {employee.first_name}
                </td>
                <td className="border border-green-400 px-[1%] max-sm:text-sm p-[1%] max-sm:p-1">
                  {employee.last_name}
                </td>
                <td className="border border-green-400 px-[1%] max-sm:text-sm p-[1%] max-sm:p-1">
                  {employee.email}
                </td>
                <td className="border border-green-400 px-[1%] max-sm:text-sm p-[1%] max-sm:p-1">
                  {employee.number}
                </td>
                <td className="border border-green-400 px-[1%] max-sm:text-sm p-[1%] max-sm:p-1 text-center ">
                  {employee.gender === "F" ? "Female" : "Male"}
                </td>
                <td>
                  <div className="flex  items-center justify-center space-x-2 max-sm:flex max-sm:space-x-2 max-sm:items-center max-sm:justify-center">
                    <button
                      className="p-[6%] max-sm:py-[5%] rounded-lg text-sm text-white bg-gray-600 shadow-md duration-200 hover:bg-blue-200 focus:outline-none focus:bg-purple-600 ... hover:scale-110 transition-transform  ease-in-out"
                      onClick={() => handelEditClick(employee.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="p-[6.5%] max-sm:py-[7%] max-sm:pl-[7%] rounded-lg w-[36px] text-white bg-red-600 shadow-md duration-200 hover:bg-red-200 focus:outline-none focus:bg-purple-600 ... hover:scale-110 transition-transform  ease-in-out"
                      onClick={() => handleDeleteClick(employee.id)}
                    >
                      <MdOutlineDeleteOutline />
                    </button>
                  </div>
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
