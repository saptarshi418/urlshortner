import React, { useEffect, useState } from 'react'
import { Loader } from "lucide-react";
import api from "../services/api";
import axios from "axios";
import {API_BASE_URL} from "../services/config"
import { useNavigate, useParams } from "react-router-dom";


const RedirectPage = () => {


    const {shortCode} = useParams ()
    const navigate = useNavigate();


    useEffect(()=>{
        const GetCode = async ()=>{
            try {
                const response = await axios.get(
                    `${API_BASE_URL}${shortCode}/`
                );

                window.location.replace(response.data.original_url);

            } catch (error) {

                if (error.response?.status === 404) {
                    navigate("/not-found");
                } else if (error.response?.status === 429) {
                    alert("Rate limit exceeded");
                } else {
                    console.error(error);
                    navigate("/server-error");
                }
            }
        }
        GetCode();

    } , [shortCode]);
    

  return (
    <div className='h-screen w-full flex items-center justify-center'>
        <Loader/>
    </div>
  )
}

export default RedirectPage