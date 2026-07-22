import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../services/config";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const navigate = useNavigate()

  const emailHandler = (e)=>{
      setEmail(e.target.value)
  }
  const passwordHandler = (e)=>{
      setPassword(e.target.value)
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password){
      return
    }
    let payload = {}
    payload.email =  email;
    payload.password = password;


    try {
      const response = await axios.post(`${API_BASE_URL}auth/jwt/create/`, payload)
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      navigate('/')


    } catch (error) {
      alert(error.response?.data?.detail || "Invalid email or password.");
      console.log(error);
      
      
    }

    
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">

        <h1 className="text-3xl font-bold text-center text-rose-600">Welcome Back</h1>

        <p className="text-center text-gray-500 mt-2 mb-8"> Sign in to your account</p>

        <form onSubmit={submitHandler} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={emailHandler}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-rose-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={passwordHandler}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-rose-500"
              required
            />
          </div>

          <button type="submit" className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2.5 rounded-lg transition cursor-pointer">Login</button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">Don't have an account?{" "} <Link to="/register" className="text-rose-600 font-semibold hover:underline" >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;