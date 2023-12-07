// EmployeeAdd.jsx

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EmployeeAdd() {
  const navigate = useNavigate();

  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    number: "",
    gender: "M",
    photo: "https://picsum.photos/200/300",
  };

  const handleRegisterClick = async (values, formikBag) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/employee`,
        values,
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          withCredentials: true,
        }
      );
      console.log(response.data);

      // Refresh the summary page
      navigate("/employee/list", { replace: true });
    } catch (error) {
      console.error("Error during posting:", error);
    }
  };

  const validate = (values) => {
    const errors = {};

    // Validation rules
    if (!values.first_name) {
      errors.first_name = "First name is required";
    } else if (!/^[a-zA-Z]{6,10}$/.test(values.first_name)) {
      errors.first_name =
        "First name should only contain alphabets, min 6, max 10 characters";
    }

    if (!values.last_name) {
      errors.last_name = "Last name is required";
    } else if (!/^[a-zA-Z]{6,10}$/.test(values.last_name)) {
      errors.last_name =
        "Last name should only contain alphabets, min 6, max 10 characters";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.number) {
      errors.number = "Phone number is required";
    } else if (!/^\+94\d{9}$/.test(values.number)) {
      errors.number = "Invalid Sri Lankan phone number";
    }

    if (!values.gender) {
      errors.gender = "Gender is required";
    }

    return errors;
  };

  return (
    <div>
      <div className="px-5 py-2 ml-auto justify-end flex">
        <button
          className="w-[8%] py-2 rounded-3xl text-white bg-blue-600 shadow-md duration-200 hover:bg-blue-200 focus:outline-none focus:bg-purple-600 max-sm:w-[30%] max-sm:py-[1%] max-md:w-[15%] max-md:py-[1%] max-lg:w-[15%] max-lg:py-[1%]"
          onClick={() => navigate("/employee/list")}
        >
          List View
        </button>
      </div>
      <div className=" mt-[10px] relative flex flex-col justify-center pb-[9%] overflow-hidden max-sm:w-[95%] max-sm:justify-center max-sm:flex max-sm:mx-auto max-md:w-[95%] max-md:justify-center max-md:flex max-md:mx-auto">
        <div className="w-full p-6 m-auto mt-0 bg-white rounded-xl shadow-md lg:max-w-xl">
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleRegisterClick}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <div>
                  <div className="mb-4 flex items-center space-x-5">
                    <label className="w-[90px]">First Name</label>
                    <Field
                      type="text"
                      name="first_name"
                      className={`w-[75%] px-4 py-2 mt-2 bg-blue-200 border-b border-purple-400 outline-none rounded-sm ${
                        errors.first_name && touched.first_name
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                  </div>
                  <ErrorMessage
                    name="first_name"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div>
                  <div className="mb-4 flex items-center space-x-5">
                    <label className="w-[90px]">Last Name</label>
                    <Field
                      type="text"
                      name="last_name"
                      className={`w-[75%] px-4 py-2 mt-2 bg-blue-200 border-b border-purple-400 outline-none rounded-sm ${
                        errors.last_name && touched.last_name
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                  </div>
                  <ErrorMessage
                    name="last_name"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div>
                  <div className="mb-4 flex items-center space-x-5">
                    <label className="w-[90px]">Email</label>
                    <Field
                      type="email"
                      name="email"
                      className={`w-[75%] px-4 py-2 mt-2 bg-blue-200 border-b border-purple-400 outline-none rounded-sm ${
                        errors.email && touched.email ? "border-red-500" : ""
                      }`}
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div>
                  <div className="mb-4 flex items-center space-x-5">
                    <label className="w-[90px]">Phone</label>
                    <Field
                      type="tel"
                      name="number"
                      className={`w-[75%] px-4 py-2 mt-2 bg-blue-200 border-b border-purple-400 outline-none rounded-sm ${
                        errors.number && touched.number ? "border-red-500" : ""
                      }`}
                    />
                  </div>
                  <ErrorMessage
                    name="number"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div>
                  <div className="mb-4 flex items-center space-x-5">
                    <label className="w-[90px]">Gender</label>
                    <Field
                      as="select"
                      name="gender"
                      className={`w-[75%] px-4 py-2 mt-2 bg-blue-200 border-b border-purple-400 outline-none rounded-sm ${
                        errors.gender && touched.gender ? "border-red-500" : ""
                      }`}
                    >
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                    </Field>
                  </div>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="border-solid w-[15%] px-4 py-2 ml-auto flex items-center justify-center tracking-wide rounded-lg text-purple-950 border-purple-950 shadow-md duration-200 hover:bg-blue-200 focus:outline-none focus:bg-purple-600"
                  >
                    ADD
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default EmployeeAdd;
