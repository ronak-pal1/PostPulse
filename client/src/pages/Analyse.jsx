import { useEffect, useRef, useState } from "react";
import { JsonView, allExpanded, darkStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import AutoGraphRoundedIcon from "@mui/icons-material/AutoGraphRounded";
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";
import ChatModal from "../components/ChatModal";
import ShortUniqueId from "short-unique-id";

const uid = new ShortUniqueId({ length: 7 });

const InputComponent = ({ setAnalyzedText, tab, setId }) => {
  const [inputURL, setInputURL] = useState(
    "https://postpulse.ronakpaul.com/demo-posts?userid=ageage&n=10"
  );

  useEffect(() => {
    const randomID = uid.rnd();

    setInputURL(
      `https://postpulse.ronakpaul.com/demo-posts?userid=${randomID}&n=10`
    );
  }, []);

  const [userID, setUserID] = useState("");
  const fileInputRef = useRef(null);

  const [loadingState, setLoadingState] = useState({
    isLoading: false,
    text: "",
  });

  const [isFetching, setIsFetching] = useState(false);

  const [postType, setPostType] = useState("reel");

  const [posts, setPosts] = useState([]);
  const [CSVFile, setCSVFile] = useState("");

  const dummyFileInputClick = (e) => {
    const element = fileInputRef.current;
    element?.click();
  };

  const fetchPosts = async () => {
    if (isFetching) return;

    try {
      const parsedUrl = new URL(inputURL);

      // Extract the userid parameter
      const params = new URLSearchParams(parsedUrl.search);
      const userid = params.get("userid");

      if (!userid) return;
      else {
        setUserID(userid);
        setId(userid);
      }

      setIsFetching(true);

      const response = await fetch(inputURL);

      const data = await response.json();

      setPosts(data.posts);
    } catch (e) {
      console.log(e);
      console.log("Error in fetching posts");
    }

    setIsFetching(false);
  };

  const savePosts = async () => {
    try {
      const response = await fetch(
        "https://postpulse.ronakpaul.com/put-posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ posts }),
        }
      );
    } catch (e) {
      console.log("Error in analyzing the data");
    }
  };

  const analyze = async () => {
    try {
      setAnalyzedText({
        isAnalyzing: true,
        data: [],
      });
      const response = await fetch(
        `https://postpulse.ronakpaul.com/analyse-posts?userid=${userID}&ptype=${postType}`
      );

      const data = await response.json();
      setAnalyzedText({
        isAnalyzing: false,
        data: data.response.split(","),
      });
    } catch (e) {
      console.log(e);
      console.log("Error in analyzing the data");
      setAnalyzedText({
        isAnalyzing: false,
        data: [],
      });
    }
  };

  const saveAndAnalyze = async () => {
    if (posts.length == 0 || loadingState.isLoading) return;

    setLoadingState({
      isLoading: true,
      text: "Saving...",
    });

    await savePosts();

    setLoadingState({
      isLoading: true,
      text: "Analyzing...",
    });

    await analyze();

    setLoadingState({
      isLoading: false,
      text: "",
    });
  };

  useEffect(() => {
    if (CSVFile) {
      const reader = new FileReader();

      // Read the file as text
      reader.onload = (e) => {
        const text = e.target.result;
        const parsedData = parseCSV(text);

        const json_data = [];
        for (let i = 1; i < parsedData.length; i++) {
          const row = parsedData[i];

          if (row.length == 5) {
            json_data.push({
              user_id: row[0],
              post_type: row[1],
              likes: row[2],
              shares: row[3],
              comments: row[4],
            });
          }
        }

        setPosts(json_data);
      };

      reader.readAsText(CSVFile);
    }
  }, [CSVFile]);

  // Function to parse CSV text
  const parseCSV = (csvText) => {
    const rows = csvText.split("\n");
    return rows.map((row) => row.replace(/\r$/, "").split(","));
  };

  return (
    <div>
      {tab == 0 ? (
        <div className="w-full flex items-center space-x-3">
          <input
            type="text"
            value={inputURL}
            onChange={(e) => {
              setInputURL(e.target.value);
            }}
            className="w-full bg-black py-2 px-3 rounded-md text-white placeholder:text-slate-500 outline-none"
            placeholder="URL"
          />
          <button
            className="bg-white px-4 py-1 rounded-md text-sm"
            onClick={fetchPosts}
          >
            Fetch
          </button>
        </div>
      ) : (
        <div className="w-full">
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setCSVFile(file);
              }
            }}
            className="hidden"
          />
          <div
            className="flex items-center justify-center py-2 rounded-md space-x-4 w-full bg-white cursor-pointer"
            onClick={dummyFileInputClick}
          >
            <FileUploadRoundedIcon />
            <p className="text-black">Choose a CSV file</p>
          </div>
        </div>
      )}

      <div className="mt-8">
        <div
          className={`bg-black h-72 rounded-lg border border-neutral-800  ${
            posts.length == 0
              ? "flex justify-center  items-center"
              : "overflow-y-scroll no-scrollbar"
          }`}
        >
          {isFetching ? (
            <p className="bg-gradient-to-r from-orange-400  to-indigo-400 inline-block text-transparent bg-clip-text">
              Fetching...
            </p>
          ) : posts.length == 0 ? (
            <p className="text-slate-500">No fetched data </p>
          ) : (
            <JsonView
              data={posts}
              shouldExpandNode={allExpanded}
              style={darkStyles}
            />
          )}
        </div>
      </div>

      <div className="flex items-center space-x-5 mt-6">
        <button
          className={`px-8 py-2 rounded-md bg-blue-700 text-white flex items-center space-x-3  ${
            posts.length == 0 && "brightness-50 cursor-not-allowed"
          }`}
          onClick={saveAndAnalyze}
        >
          {loadingState.isLoading ? (
            <p>{loadingState.text}</p>
          ) : (
            <>
              <p> Analyze </p> <AutoGraphRoundedIcon />
            </>
          )}
        </button>

        <div>
          <select
            className="px-2 py-1 bg-transparent text-white border border-neutral-800 rounded-md"
            value={postType}
            onChange={(e) => setPostType(e.target.value)}
          >
            <option value="reel">Reel</option>
            <option value="carousel">Carousel</option>
            <option value="static image">Static image</option>
          </select>
        </div>
      </div>
    </div>
  );
};

const Analyse = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const [analyzedText, setAnalyzedText] = useState({
    isAnalyzing: false,
    data: [],
  });
  const [id, setId] = useState("");

  const [isChatModalHidden, setIsChatModalHidden] = useState(true);

  /*

        You are a helpfull assitance for social media post analysis. Total post types: reels, carousel, static image. Your task is to analyze the post and give simple insights. For example: Carousel posts have 20% higher engagement than static images, Reels drive 2x more comments compared to other formats. (Only in this format) Also if there is no post of one type that mention that as well. Make it as array of insights so that I can process it on my end.
    */

  return (
    <div className="h-screen flex flex-1">
      <ChatModal
        isHidden={isChatModalHidden}
        setIsHidden={setIsChatModalHidden}
        userid={id}
      />

      <div className="h-full w-full flex-[0.5] flex items-center justify-center">
        <div className="h-3/4 w-full mt-3 mx-7">
          <p className="text-white text-xl font-medium py-3">
            Provide Engagement Data / URL{" "}
          </p>
          <div className="h-full w-full py-1">
            {/* Tabs */}
            <div className="w-full flex items-center space-x-4 mb-2">
              <button
                className={` w-full py-1 rounded-md ${
                  currentTab == 0
                    ? "bg-white text-black"
                    : "bg-black text-white border border-neutral-800"
                }`}
                onClick={() => setCurrentTab(0)}
              >
                URL Input
              </button>
              <button
                className={` w-full py-1 rounded-md ${
                  currentTab == 1
                    ? "bg-white text-black"
                    : "bg-black text-white border border-neutral-800"
                }`}
                onClick={() => setCurrentTab(1)}
              >
                CSV Input
              </button>
            </div>
            <div className="h-fit w-full  bg-neutral-900 rounded-md px-4 py-7 shadow-[0px_45px_97px_-46px_#7075ff62]">
              {/* URL input component */}

              <InputComponent
                setAnalyzedText={setAnalyzedText}
                tab={currentTab}
                setId={setId}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="h-full flex-[0.5] flex items-center justify-center px-10 leading-7">
        {analyzedText.data.length != 0 ? (
          <div className="text-white leading-8">
            {analyzedText.data.map((insight) => (
              <p>- {insight}</p>
            ))}
          </div>
        ) : (
          <div className="text-white">
            {analyzedText.isAnalyzing ? (
              <p>Analyzing...</p>
            ) : (
              <p>No analysis</p>
            )}
          </div>
        )}
      </div>

      <div
        className="absolute bottom-10 right-10 w-fit bg-zinc-900 p-3 rounded-full cursor-pointer"
        onClick={() => setIsChatModalHidden(!isChatModalHidden)}
      >
        <ChatBubbleRoundedIcon className="text-violet-600" fontSize="medium" />
      </div>
    </div>
  );
};

export default Analyse;
