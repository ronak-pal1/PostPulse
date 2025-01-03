import { useEffect, useRef, useState } from "react";
import { JsonView, allExpanded, darkStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";

const InputComponent = ({ setAnalyzedText, tab }) => {
  const [URL, setURL] = useState(
    "http://localhost:8000/demo-posts?userid=gaage"
  );

  const fileInputRef = useRef(null);

  const [postType, setPostType] = useState("reel");

  const [posts, setPosts] = useState([]);
  const [CSVFile, setCSVFile] = useState("");

  const dummyFileInputClick = (e) => {
    const element = fileInputRef.current;
    element?.click();
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch(URL);

      const data = await response.json();

      setPosts(data.posts);
    } catch (e) {
      console.log("Error in fetching posts");
    }
  };

  const savePosts = async () => {
    try {
      const response = await fetch("http://localhost:8000/put-posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ posts }),
      });
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
        `http://localhost:8000/analyse-posts?userid=gaage&ptype=${postType}`
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
    // if (posts.length == 0) return;
    // await savePosts();
    await analyze();
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
          {posts.length == 0 ? (
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
          className={`px-8 py-2 rounded-md bg-blue-700 text-white  ${
            posts.length == 0 && "brightness-50 cursor-not-allowed"
          }`}
          onClick={saveAndAnalyze}
        >
          Analyze
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

  /*

        You are a helpfull assitance for social media post analysis. Total post types: reels, carousel, static image. Your task is to analyze the post and give simple insights. For example: Carousel posts have 20% higher engagement than static images, Reels drive 2x more comments compared to other formats. (Only in this format) Also if there is no post of one type that mention that as well. Make it as array of insights so that I can process it on my end.
    */

  return (
    <div className="h-screen flex flex-1">
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
    </div>
  );
};

export default Analyse;
