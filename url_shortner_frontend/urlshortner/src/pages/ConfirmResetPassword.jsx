import React, { useState } from "react";
import { useParams } from "react-router-dom";


const ConfirmResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { uid, token } = useParams();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      alert("Please fill in both fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Password reset confirmation API call
    console.log({
      password,
      confirmPassword,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">

        <h1 className="text-3xl font-bold text-center text-rose-600">
          Set New Password
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Enter your new password below.
        </p>

        <form onSubmit={submitHandler} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>

            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-rose-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-rose-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2.5 rounded-lg transition cursor-pointer"
          >
            Update Password
          </button>

        </form>
      </div>
    </div>
  );
};

export default ConfirmResetPassword;