import { useNavigate } from "react-router-dom";
import SOCIAL_MEDIA_IMG from "../assets/social-media.png";
import TEAMLOGO from "../assets/cobalt.png";
import AutoGraphRoundedIcon from "@mui/icons-material/AutoGraphRounded";
import Thumbnail from "../assets/thumbnail.png";
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
            className="px-8 py-2 rounded-md bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200 text-xl mt-9 flex items-center space-x-3"
            onClick={() => navigate("/analyze")}
          >
            <p> Analyze now </p> <AutoGraphRoundedIcon />
          </button>
        </div>
        <div className="flex-[0.5]">
          <img src={SOCIAL_MEDIA_IMG} alt="social media platform images" />
        </div>
      </div>

      {/* How it works youtube video */}
      <div className=" flex flex-col  items-center justify-center my-24 space-y-6">
        <h1 className="text-5xl font-semibold bg-gradient-to-r from-orange-400  to-indigo-400 inline-block text-transparent bg-clip-text">
          How to works?
        </h1>
        <p className="text-lg  text-gray-400">
          Checkout the Youtube video to understand its whole flow and how it is
          actually working at the back
        </p>

        <iframe
          width="760"
          height="415"
          src="https://www.youtube.com/embed/8VICapn_imw?si=KKvdzGgcEJuOG7-x"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>

        {/* <div className="width-[760px]">
          <img src={Thumbnail} alt="youtube thumbnail" width={"760px"} />
        </div> */}
      </div>

      <footer className="h-fit py-4  px-9 w-full bg-neutral-950">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white">
              SuperMind Hackathon
            </h1>
          </div>

          <div className="flex flex-col items-center justify-center space-y-5">
            <img src={TEAMLOGO} alt="team logo" className="w-36" />
            <p className="text-xl text-white font-semibold">Cobalt</p>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <p className="text-slate-500">2024@PostPulse</p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
