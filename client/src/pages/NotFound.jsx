import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center mt-36">
      <div className="flex-col text-center space-y-7">
        <h1 className="text-white text-5xl font-extrabold">404 Not Found</h1>
        <button
          className="px-8 py-1 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200 text-base"
          onClick={() => navigate("/")}
        >
          Back to home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
