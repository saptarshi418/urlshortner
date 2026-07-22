import { Link } from "react-router-dom";
import { TriangleAlert } from "lucide-react";

const NotFound = () => {
    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center gap-5 bg-gray-100">
            <TriangleAlert size={80} className="text-rose-700" />

            <h1 className="text-5xl font-bold text-gray-800">
                404
            </h1>

            <p className="text-xl text-gray-600">
                Oops! The short URL doesn't exist.
            </p>

            <Link
                to="/"
                className="px-5 py-2 rounded-lg bg-rose-700 text-white font-semibold hover:bg-rose-800 transition"
            >
                Back to Home
            </Link>
        </div>
    );
};

export default NotFound;