import express from "express";
import cors from "cors";
import genRandom from "./utils/random.js";
import { runAIWorkFlow } from "./workflow/langflow.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

// for generating demo-posts
app.get("/demo-posts", (req, res) => {
  const userId = req.query.userid;

  const numberOfPosts = req.query.n || 10;

  const POST_TYPES = ["reel", "static image", "carousel"];

  const posts = [];

  for (let i = 0; i < numberOfPosts; i++) {
    posts.push({
      user_id: userId,
      post_type: POST_TYPES[genRandom(0, 4)],
      likes: genRandom(30, 500),
      comments: genRandom(30, 1000),
      shares: genRandom(10, 600),
    });
  }

  res.json({ posts });
});

// for putting demo posts
app.get("/analyse-posts", async (req, res) => {
  const userId = req.query.userid;
  const response = await runAIWorkFlow(
    `can you compare static image of user id ${userId} with other post types.`
  );

  res.json({ response });
});

app.listen(PORT, () => {
  console.log("Server is listening in the port " + PORT);
});
