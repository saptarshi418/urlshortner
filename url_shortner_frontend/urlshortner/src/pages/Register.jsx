import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../services/config";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    confirm_password: "",
  });

  const navigate = useNavigate()

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
        const response = axios.post(`${API_BASE_URL}register/` , formData)
        navigate('/verify')
    } catch (error) {
        
    }
   
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4 py-8">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-md p-8">

        <h1 className="text-3xl font-bold text-center text-rose-600">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Join and start shortening your URLs
        </p>

        <form onSubmit={submitHandler} className="space-y-5">

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                First Name
              </label>

              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={changeHandler}
                placeholder="First Name"
                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-rose-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Last Name
              </label>

              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={changeHandler}
                placeholder="Last Name"
                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-rose-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={changeHandler}
              placeholder="Enter your email"
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-rose-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Phone Number
            </label>

            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={changeHandler}
              placeholder="+91XXXXXXXXXX"
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-rose-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={changeHandler}
              placeholder="Enter password"
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-rose-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={changeHandler}
              placeholder="Confirm password"
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-rose-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2.5 rounded-lg transition cursor-pointer"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-rose-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;