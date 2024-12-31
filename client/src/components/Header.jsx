import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-black flex items-center justify-between py-7 px-10 fixed w-full top-0 left-0">
      <div>
        <h1
          onClick={() => navigate("/")}
          className="text-white text-2xl font-medium cursor-pointer"
        >
          PostPulse
        </h1>
      </div>

      <div>
        <button
          className="px-8 py-1 rounded-full bg-gradient-to-r from-slate-400 to-white text-black focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200 text-base"
          onClick={() => navigate("/analyze")}
        >
          Get Started
        </button>
      </div>
    </header>
  );
};

export default Header;
