import React, { useEffect, useState } from "react";
import NavBar from "../components/nav/NavBar";
import Footer from "../components/nav/Footer";
import UploadUrls from "../components/page_home_components/UploadUrls";
import { Loader } from "lucide-react";
import api from "../services/api";

const Home = () => {
    const [isLogged, setIsLogged] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            try {
                await api.get("auth/users/me/");
                setIsLogged(true);
            } catch (error) {
                setIsLogged(false);
            } finally {
                setLoading(false);
            }
        };

        checkUser();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader className="animate-spin" size={40} />
            </div>
        );
    }

    return (
        <div className="pt-2 px-2.5 min-h-screen flex flex-col">
            <NavBar isLogged={isLogged} />

            <div className="flex-1 flex">
                <UploadUrls isLogged={isLogged} />
            </div>

            <Footer />
        </div>
    );
};

export default Home;