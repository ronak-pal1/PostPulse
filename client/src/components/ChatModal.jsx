import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";
import { useState } from "react";

const ChatModal = ({ isHidden, setIsHidden, userid }) => {
  // type: Human
  // type: AI
  //  structure: {type,text}
  const [chatHistory, setChatHistory] = useState([]);
  const [chatText, setChatText] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const fetchAIResponse = async (prompt) => {
    if (!userid) {
      return;
    }

    setIsThinking(true);

    try {
      const response = await fetch("https://postpulse.ronakpaul.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userid, prompt }),
      });

      const data = await response.json();

      if (response.ok) {
        const tempHistory = chatHistory;
        tempHistory.push({
          type: "AI",
          text: data.response,
        });
        setChatHistory(tempHistory);
      }
    } catch (e) {
      console.log("Error in chatting with the model");
    }

    setIsThinking(false);
  };

  const sendText = async () => {
    if (!chatText) return;

    const tempText = chatText;

    const tempHistory = chatHistory;
    tempHistory.push({
      type: "Human",
      text: chatText,
    });

    setChatHistory(tempHistory);

    setChatText("");

    await fetchAIResponse(tempText);
  };

  return (
    <div
      className={`absolute top-0 left-0 w-full h-screen flex items-center justify-center backdrop-blur-sm ${
        isHidden && "hidden"
      } z-50`}
    >
      <div className="w-3/4 h-4/5 bg-neutral-900 px-5 py-7 rounded-md shadow-md shadow-black">
        <div className="flex items-center justify-between">
          <ChatBubbleRoundedIcon className="text-neutral-700" />
          <CloseRoundedIcon
            className="text-white cursor-pointer"
            onClick={() => setIsHidden(true)}
          />
        </div>

        {/* Chat box */}
        <div className="w-full h-full flex flex-col flex-1">
          <div className="flex-[0.9] w-full px-6 py-5 space-y-7 overflow-y-scroll no-scrollbar">
            {chatHistory.map((history, index) => (
              <div
                className={` rounded-md ${
                  history.type == "Human"
                    ? "w-[400px] ml-auto bg-blue-800 "
                    : "w-[470px] mr-auto bg-neutral-700 "
                } px-5 py-3 `}
                key={index}
              >
                <p className="text-white">{history.text}</p>
              </div>
            ))}
            {isThinking && (
              <div className="w-[200px] mr-auto  px-5 py-3">
                <p className="bg-gradient-to-r from-orange-400  to-indigo-400 inline-block text-transparent bg-clip-text">
                  Flow running...
                </p>
              </div>
            )}
          </div>

          <div className="flex-[0.1] w-full flex items-center justify-center">
            <div className="w-3/4 flex items-center bg-black px-5 py-2 rounded-full">
              <input
                type="text"
                value={chatText}
                onChange={(e) => setChatText(e.target.value)}
                className="w-full bg-transparent placeholder:text-slate-600 outline-none text-slate-400"
                placeholder="Chat with the model"
              />
              <SendRoundedIcon
                className="text-neutral-600 cursor-pointer"
                onClick={sendText}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
