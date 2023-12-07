import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

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
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/employee/${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  const validate = (values) => {
    const errors = {};

    // Validation for first_name
    if (!values.first_name) {
      errors.first_name = "First name is required";
    } else if (!/^[a-zA-Z]+$/.test(values.first_name)) {
      errors.first_name = "Only alphabets are allowed";
    } else if (values.first_name.length < 6 || values.first_name.length > 10) {
      errors.first_name = "Must be between 6 and 10 characters";
    }

    // Validation for last_name
    if (!values.last_name) {
      errors.last_name = "Last name is required";
    } else if (!/^[a-zA-Z]+$/.test(values.last_name)) {
      errors.last_name = "Only alphabets are allowed";
    } else if (values.last_name.length < 6 || values.last_name.length > 10) {
      errors.last_name = "Must be between 6 and 10 characters";
    }

    // Validation for email
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      errors.email = "Invalid email address";
    }

    // Validation for number
    if (!values.number) {
      errors.number = "Phone number is required";
    } else if (!/^\+94\d{9}$/.test(values.number)) {
      errors.number = "Invalid phone number";
    }

    // Validation for gender
    if (!values.gender) {
      errors.gender = "Gender is required";
    }

    return errors;
  };

  const handleFormSubmit = async (values) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/employee/${id}`,
        values
      );
      console.log(response.data);
      navigate(`/employee/list`);
    } catch (error) {
      console.error("Error during posting:", error);
    }
  };

  return (
    <div className="relative flex flex-col justify-center pb-[9%] overflow-hidden">
      <div className="w-full p-6 m-auto mt-0 bg-white rounded-xl shadow-md lg:max-w-xl">
        <Formik
          initialValues={data}
          enableReinitialize={true}
          validate={validate}
          onSubmit={handleFormSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="mb-4 flex items-center space-x-5">
                <label className="mr-[-0.3%]">First Name</label>
                <Field
                  type="text"
                  name="first_name"
                  className={`w-[75%] px-4 py-2 mt-2 bg-blue-200 border-b border-purple-400 outline-none rounded-sm ${
                    errors.first_name && touched.first_name
                      ? "border-red-500"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="first_name"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mb-4 flex items-center space-x-5">
                <label className="mr-[0.1%]">Last Name</label>
                <Field
                  type="text"
                  name="last_name"
                  className={`w-[75%] px-4 py-2 mt-2 bg-blue-200 border-b border-purple-400 outline-none rounded-sm ${
                    errors.last_name && touched.last_name
                      ? "border-red-500"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="last_name"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mb-4 flex items-center space-x-5">
                <label className="mr-[7.5%]">Email</label>
                <Field
                  type="email"
                  name="email"
                  className={`w-[75%] px-4 py-2 mt-2 bg-blue-200 border-b border-purple-400 outline-none rounded-sm ${
                    errors.email && touched.email ? "border-red-500" : ""
                  }`}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mb-4 flex items-center space-x-5">
                <label className="mr-[6%]">Phone</label>
                <Field
                  type="tel"
                  name="number"
                  className={`w-[75%] px-4 py-2 mt-2 bg-blue-200 border-b border-purple-400 outline-none rounded-sm ${
                    errors.number && touched.number ? "border-red-500" : ""
                  }`}
                />
                <ErrorMessage
                  name="number"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mb-4 flex items-center space-x-5">
                <label className="mr-[5%]">Gender</label>
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
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-[15%] px-4 py-2 ml-auto items-center flex tracking-wide rounded-lg text-purple-950 border-purple-950 shadow-md duration-200 hover:bg-blue-200 focus:outline-none focus:bg-purple-600"
                >
                  SAVE
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Edit;
