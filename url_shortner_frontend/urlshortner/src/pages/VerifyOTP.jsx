import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../services/config";
import { Loader } from "lucide-react";
import api from "../services/api";





const VerifyOtp = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate();


  useEffect(()=>{                     // prevent logged user to access this endpoint 

    const PreventLoggedUserHandler = async ()=>{
      try {
        const response = await api.get(`auth/users/me/`)
        if (response.status == 200){
          navigate(`/`)
        }

      }catch (error){
        
      }finally{
      setIsLoading(false);
    }
    }
    PreventLoggedUserHandler();


  },[])  



  const submitHandler = async (e) => {
    e.preventDefault();

    if(!email || !otp){
        alert(`Email or Password can't be null`)
        return 
    }

    let payload = {}
    payload.email = email;
    payload.otp = otp;
    

    try {
        const response = await axios.post(`${API_BASE_URL}verify-otp/`,payload)
        navigate('/login')
    } catch (error) {
        alert(error.response?.data?.detail || "Invalid email or otp.");
        console.log(error);
    }
    
  };


  if (isLoading) {
            return (
                <div className="min-h-screen flex items-center justify-center">
                    <Loader className="animate-spin" size={40} />
                </div>
            );
      }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">

        <h1 className="text-3xl font-bold text-center text-rose-600">
          Verify OTP
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Enter the OTP sent to your email
        </p>

        <form  className="space-y-5">

          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-rose-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              OTP
            </label>

            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              pattern="[0-9]{6}"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, ""))
              }
              className="w-full border rounded-lg px-4 py-2 text-center tracking-[0.5em] text-xl font-semibold outline-none focus:ring-2 focus:ring-rose-500"
              required
            />
          </div>

          <button
            onClick={submitHandler}
            type="button"
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2.5 rounded-lg transition cursor-pointer"
          >
            Verify OTP
          </button>

        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;