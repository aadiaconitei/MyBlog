import express, { Request, Response } from "express";
import * as bodyParser from "body-parser";
import { verifyToken } from "../jwt";
import * as postModel from "../models/post";
import { Post } from "../types/Post";

const adminRouter = express.Router();
var jsonParser = bodyParser.json();

adminRouter.get("/", async (req: Request, res: Response) => {
  if (!verifyToken(req, res)) {
    return res.status(403).json({
      message: "<b>Trebue sa fi logat pentru a accesa aceasta zona!<b>",
    });
  }
  postModel.findAll((err: Error, posts: Post[]) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.status(200).json({ data: posts });
  });
});

export { adminRouter };
