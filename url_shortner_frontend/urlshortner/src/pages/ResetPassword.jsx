import React, { useState } from "react";
import axios from "axios";
import {API_BASE_URL} from "../services/config"

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email.");
      return;
    }

    try {
      const payload ={"email":email}
      const response = await axios.post(`${API_BASE_URL}/auth/users/reset_password/`,payload)
      if(response.status ==204){
        alert(`Check your email for the reset link`)

      }
      console.log(response.status);
      
    } catch (error) {
      alert(`chech your email and try again`)
      
    }


    
    console.log({ email });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">

        <h1 className="text-3xl font-bold text-center text-rose-600">
          Reset Password
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Enter your email to receive a password reset link.
        </p>

        <form onSubmit={submitHandler} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-rose-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2.5 rounded-lg transition cursor-pointer"
          >
            Send Reset Link
          </button>

        </form>

      </div>
    </div>
  );
};

export default ResetPassword;