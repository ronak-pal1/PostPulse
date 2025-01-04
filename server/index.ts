import express, { Request, Response } from "express";
import cors from "cors";
import genRandom from "./utils/random";
import { runAIWorkFlow } from "./workflow/langflow";
import dotenv from "dotenv";
import dbConnect, { collection } from "./db/db-connect";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

dbConnect();

app.use(cors());
app.use(express.json());

// for generating demo-posts
app.get("/demo-posts", (req: Request, res: Response) => {
  const userId = req.query.userid;

  const numberOfPosts: number = parseInt(req.query.n as string) || 10;

  const POST_TYPES = ["reel", "static image", "carousel"];

  const posts = [];

  for (let i = 0; i < numberOfPosts; i++) {
    posts.push({
      user_id: userId,
      post_type: POST_TYPES[genRandom(0, 3)],
      likes: genRandom(30, 500),
      comments: genRandom(30, 1000),
      shares: genRandom(10, 600),
    });
  }

  res.status(200).json({ posts });
});

// for putting the data's to the db
app.post("/put-posts", async (req: Request, res: Response) => {
  const posts: {
    user_id: string;
    post_type: string;
    likes: number;
    comments: number;
    shares: number;
  }[] = req.body.posts;

  try {
    const response = await collection.insertMany(posts);
    console.log(response);
    res
      .status(200)
      .json({ message: "Posts are inserted into the db successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server problem in putting the posts" });
  }
});

// for putting demo posts
app.get("/analyse-posts", async (req: Request, res: Response) => {
  const userId: string = req.query.userid as string;
  const post_type: string = req.query.ptype as string;

  const response = await runAIWorkFlow(
    `can you compare ${post_type} of user id ${userId} with the post types. Seprate each insight by comma and don't include any other thing other than insights.`
  );

  res.status(200).json({ response });
});

app.listen(PORT, () => {
  console.log("Server is listening in the port " + PORT);
});

// for chatting with the model
app.post("/chat", async (req: Request, res: Response) => {
  const userId: string = req.body.userid as string;
  const prompt: string = req.body.prompt as string;

  const response = await runAIWorkFlow(`My user id ${userId} . ${prompt}`);

  res.status(200).json({ response });
});
