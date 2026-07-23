import React from "react";
import logo from "../../assets/logo.png";
import { useNavigate } from 'react-router-dom';


import {
    UserRoundCheck,
    UserRoundX,
} from "lucide-react";

const NavBar = ({ isLogged }) => {

    const navigate = useNavigate()

    const myUrlsHandler = ()=>{
        navigate('/my-urls')
    }

    const myProfileHandler = ()=>{
        navigate('/my-profile')
    }

    const redirectToHome = ()=>{
        navigate('/')
    }

    const redirectLoginHandler = ()=>{
        navigate('/login')
    }
    


    return (
        <div className="h-20 w-full bg-rose-700 rounded-2xl px-3">
            <div className="h-full flex items-center justify-between">

                <img
                    src={logo}
                    alt="URL Trimmer Logo"
                    onClick={redirectToHome}
                    className="h-12 w-auto hover:cursor-pointer"
                />

                <div className="flex items-center gap-12">

                    <p className="relative inline-block px-2 py-1 cursor-pointer overflow-hidden group font-bold text-white" onClick={myUrlsHandler}>
                        My Urls

                        <span className="absolute bottom-0 -left-full h-0.5 w-full bg-rose-500 transition-all duration-300 group-hover:left-0"></span>
                    </p>

                    {isLogged ? (
                        <UserRoundCheck
                            size={40}
                            color="#fff"
                            className="cursor-pointer"
                            onClick={myProfileHandler}
                        />
                    ) : (
                        <UserRoundX
                            size={40}
                            color="#fff"
                            className="cursor-pointer"
                            onClick={redirectLoginHandler}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavBar;