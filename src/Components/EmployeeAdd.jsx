import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function EmployeeAdd() {
  const navigate = useNavigate();
  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    number: "",
    gender: "M",
    photo:
      "https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg",
  };
  console.log(process.env.REACT_APP_API_BASE_URL);
  const handleRegisterClick = async (values) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/employee`,
        values, // Use the values parameter from Formik

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
  };
  // const handelAdd = (id) => {
  //   navigate(`/employee/list`);
  // };

  const validate = (values) => {
    const errors = {};

    if (!values.first_name) {
      errors.first_name = "First name is required";
    }

    if (!values.last_name) {
      errors.last_name = "Last name is required";
    }

    if (!values.email) {
      errors.email = "Email is required";
    }

    if (!values.number) {
      errors.number = "Phone number is required";
    }

    if (!values.gender) {
      errors.gender = "Gender is required";
    }

    return errors;
  };

  return (
    <div>
      <div className="px-5 py-2  ml-auto justify-end flex">
        <button
          className="w-[8%] py-2   rounded-3xl text-white bg-blue-600 shadow-md duration-200 hover:bg-blue-200 focus:outline-none focus:bg-purple-600"
          onClick={() => navigate("/employee/list")}
        >
          List View
        </button>
      </div>
      <div className="relative flex flex-col justify-center pb-[9%] overflow-hidden">
        <div className="w-full p-6 m-auto mt-0 bg-white rounded-xl shadow-md lg:max-w-xl">
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleRegisterClick}
          >
            <Form>
              <div className="mb-4 flex items-center space-x-5">
                <label className="mr-[-0.3%]">First Name</label>
                <Field
                  type="text"
                  name="first_name"
                  className="w-[75%] px-4 py-2 mt-2 bg-blue-200 border-b border-purple-400 outline-none rounded-sm"
                />
                <ErrorMessage name="first_name" component="div" />
              </div>

              <div className="mb-4 flex items-center space-x-5">
                <label className="mr-[0.1%]">Last Name</label>
                <Field
                  type="text"
                  name="last_name"
                  className="w-[75%] px-4 py-2 mt-2 bg-blue-200 border-b border-purple-400 outline-none rounded-sm"
                />
                <ErrorMessage name="last_name" component="div" />
              </div>

              <div className="mb-4 flex items-center space-x-5">
                <label className="mr-[7.5%]">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="w-[75%] px-4 py-2 mt-2 bg-blue-200 border-b border-purple-400 outline-none rounded-sm"
                />
                <ErrorMessage name="email" component="div" />
              </div>

              <div className="mb-4 flex items-center space-x-5">
                <label className="mr-[6%]">Phone</label>
                <Field
                  type="tel"
                  name="number"
                  className="w-[75%] px-4 py-2 mt-2 bg-blue-200 border-b border-purple-400 outline-none rounded-sm"
                />
                <ErrorMessage name="number" component="div" />
              </div>

              <div className="mb-4 flex items-center space-x-5">
                <label className="mr-[5%]">Gender</label>
                <Field
                  as="select"
                  name="gender"
                  className="w-[75%] px-4 py-2 mt-2 bg-blue-200 border-b border-purple-400 outline-none rounded-sm"
                >
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </Field>
                <ErrorMessage name="gender" component="div" />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-[15%] px-4 py-2 ml-auto items-center flex tracking-wide rounded-lg text-purple-950 border-purple-950 shadow-md duration-200 hover:bg-blue-200 focus:outline-none focus:bg-purple-600"
                  // onClick={() => handelAdd()}
                >
                  ADD
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default EmployeeAdd;
