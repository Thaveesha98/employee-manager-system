import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    number: "",
    gender: "M",
  });

  useEffect(() => {
    // Make a GET request to your backend API endpoint
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/employee${id}`)
      .then((response) => {
        // Update the state with the fetched data
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/employee${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error during posting:", error);
    }
    navigate(`/employee/list`);
  };

  return (
    <div className="relative flex flex-col justify-center pb-[9%] overflow-hidden">
      <div className="w-full p-6 m-auto mt-0 bg-white rounded-xl shadow-md lg:max-w-xl">
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4 flex items-center space-x-5">
            <label className="mr-[-0.3%]">First Name</label>
            <input
              type="text"
              name="first_name"
              value={data.first_name}
              onChange={handleInputChange}
              className="w-[75%] px-4 py-2 mt-2 bg-blue-200 border-b border-purple-400 outline-none rounded-sm"
            />
          </div>

          <div className="mb-4 flex items-center space-x-5">
            <label className="mr-[0.1%]">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={data.last_name}
              onChange={handleInputChange}
              className="w-[75%] px-4 py-2 mt-2 bg-blue-200 border-b border-purple-400 outline-none rounded-sm"
            />
          </div>

          <div className="mb-4 flex items-center space-x-5">
            <label className="mr-[7.5%]">Email</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleInputChange}
              className="w-[75%] px-4 py-2 mt-2 bg-blue-200 border-b border-purple-400 outline-none rounded-sm"
            />
          </div>

          <div className="mb-4 flex items-center space-x-5">
            <label className="mr-[6%]">Phone</label>
            <input
              type="tel"
              name="number"
              value={data.number}
              onChange={handleInputChange}
              className="w-[75%] px-4 py-2 mt-2 bg-blue-200 border-b border-purple-400 outline-none rounded-sm"
            />
          </div>

          <div className="mb-4 flex items-center space-x-5">
            <label className="mr-[5%]">Gender</label>
            <select
              name="gender"
              value={data.gender}
              onChange={handleInputChange}
              className="w-[75%] px-4 py-2 mt-2 bg-blue-200 border-b border-purple-400 outline-none rounded-sm"
            >
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="w-[15%] px-4 py-2 ml-auto items-center flex tracking-wide rounded-lg text-purple-950 border-purple-950 shadow-md duration-200 hover:bg-blue-200 focus:outline-none focus:bg-purple-600"
              // onClick={() => handelSave()}
            >
              SAVE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Edit;
