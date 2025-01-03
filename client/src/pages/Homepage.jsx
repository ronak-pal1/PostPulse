import { useNavigate } from "react-router-dom";
import SOCIAL_MEDIA_IMG from "../assets/social-media.png";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex flex-1 h-screen items-center">
        <div className="flex-[0.5] px-10 py-28">
          <h2 className="text-white text-7xl  leading-tight font-medium">
            Analyze social media performance using{" "}
            <span className="bg-gradient-to-r from-blue-700  to-indigo-400 inline-block text-transparent bg-clip-text">
              GenAI
            </span>
          </h2>

          <button
            className="px-8 py-2 rounded-md bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200 text-xl mt-9"
            onClick={() => navigate("/analyze")}
          >
            Analyze now
          </button>
        </div>
        <div className="flex-[0.5]">
          <img src={SOCIAL_MEDIA_IMG} alt="social media platform images" />
        </div>
      </div>

      {/* How it works youtube video */}
      <div></div>
    </div>
  );
};

export default Homepage;
