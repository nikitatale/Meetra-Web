import { Link } from "react-router-dom";

export default function PageNotFound() {
    return (
        <div className="flex flex-col items-center justify-center text-sm h-[400px] bg-[#020319] min-h-screen">
            <p className="font-medium text-lg text-indigo-500">404 Error😌</p>
            <h2 className="md:text-6xl text-4xl font-semibold text-gray-300">Page Not Found</h2>
            <p className="text-base mt-4 text-gray-400">Sorry, we couldn't find the page you're looking for.</p>
            <div className="flex items-center gap-4 mt-6" >
                <Link to="/">
                <button type="button" className="bg-indigo-500 hover:bg-indigo-600 px-7 py-2.5 cursor-pointer text-white rounded active:scale-95 transition-all">
                    Go back home
                </button>
                </Link>
            </div>
        </div>
    );
};

