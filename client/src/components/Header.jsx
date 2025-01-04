import { Link, useLocation, useNavigate } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

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

      <div className="flex items-center space-x-4">
        <Link
          target="_blank"
          to={"https://github.com/ronak-pal1/PostPulse"}
          className="px-8 py-2 rounded-md bg-gradient-to-r from-neutral-900 to-black text-white hover:shadow-xl transition duration-200 text-base border border-neutral-800 flex items-center space-x-4"
        >
          <p> GitHub Repo</p> <GitHubIcon />
        </Link>

        {location.pathname == "/" && (
          <button
            className="px-8 py-1 rounded-full bg-gradient-to-r from-slate-400 to-white text-black focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200 text-base"
            onClick={() => navigate("/analyze")}
          >
            Get Started
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
