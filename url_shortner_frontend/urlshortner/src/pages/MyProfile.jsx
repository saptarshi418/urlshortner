import React, { useEffect, useState } from 'react'
import NavBar from '../components/nav/NavBar'
import Footer from '../components/nav/Footer'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'




const MyProfile = () => {
    const [isLogged, setIsLogged] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [profileData, setProfileData] = useState([])


    const nevigate = useNavigate()
    useEffect(()=>{
        const fetchProfileData = async ()=>{
            try {
                const response = await api.get(`auth/users/me/`)
                setProfileData(response.data)
                // console.log(response.data);
                setIsLogged(true);
                
            } catch (error) {
                nevigate('/login')
            }finally{
                setIsLoading(false)
                
                
            }
        };
        fetchProfileData();

    },[])

    const logoutHandler = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        setIsLogged(false);

        nevigate("/login", { replace: true });
    };



  return (
    <div className='h-screen w-screen flex flex-col px-2'>
        <NavBar isLogged={isLogged}/>
        <div className='flex-1 flex flex-col'>
           <div className="flex-1 flex items-center justify-center bg-gray-50">
  <div className="w-full max-w-lg bg-white rounded-2xl shadow-md p-8">

    <div className="flex flex-col items-center mb-8">
      <div className="w-20 h-20 rounded-full bg-rose-500 text-white flex items-center justify-center text-3xl font-bold">
        {profileData.first_name?.charAt(0)}
      </div>

      <h2 className="text-2xl font-bold mt-4">
        {profileData.first_name} {profileData.last_name}
      </h2>

      <p className="text-gray-500">My Profile</p>
    </div>

    <div className="space-y-5">

      <div className="flex justify-between border-b pb-2">
        <span className="text-gray-500">First Name</span>
        <span className="font-semibold">
          {profileData.first_name}
        </span>
      </div>

      <div className="flex justify-between border-b pb-2">
        <span className="text-gray-500">Last Name</span>
        <span className="font-semibold">
          {profileData.last_name}
        </span>
      </div>

      <div className="flex justify-between border-b pb-2">
        <span className="text-gray-500">Email</span>
        <span className="font-semibold break-all">
          {profileData.email}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-500">Phone</span>
        <span className="font-semibold">
          {profileData.phone_number}
        </span>
      </div>

      <div className="mt-8">
            <button
                onClick={logoutHandler}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 cursor-pointer"
            >
                Logout
            </button>
        </div>

    </div>
    
  </div>
  
  
</div>

        </div>
        <Footer/>

    </div>
  )
}

export default MyProfile