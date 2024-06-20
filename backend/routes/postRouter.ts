import express, { Request, Response } from "express";
import * as bodyParser from "body-parser";
import fileUpload, { UploadedFile } from "express-fileupload";
import path from "path";
import * as postModel from "../models/post";
import { Post } from "../types/Post";
const postRouter = express.Router();
var jsonParser = bodyParser.json();

postRouter.get("/", async (req: Request, res: Response) => {
  postModel.findAll((err: Error, posts: Post[]) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }

    res.status(200).json({ data: posts });
  });
});
postRouter.get("/last3", async (req: Request, res: Response) => {
  postModel.findLast3((err: Error, posts: Post[]) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }

    res.status(200).json({ data: posts });
  });
});
postRouter.get("/categories", async (req: Request, res: Response) => {
  postModel.findAllCategories((err: Error, posts: Post[]) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }

    res.status(200).json({ data: posts });
  });
});

postRouter.get("/:id", async (req: Request, res: Response) => {
  const postId: number = Number(req.params.id);
  postModel.findOne(postId, (err: Error, post: Post) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(200).json({ data: post });
  });
});

postRouter.post("/", jsonParser, async (req: Request, res: Response) => {
  console.log(req.body);
  console.log("files", req.files);
  const newPost: Post = req.body;

  let fileToUpload: any;
  let uploadPath;
  fileToUpload = req.files!.poza as UploadedFile; //Object is possibly 'null' or 'undefined'.
  const newFileName = `${Date.now()}_${fileToUpload.name}`;
  uploadPath = path.join(__dirname, "..", "/uploads/", newFileName);

  console.log(uploadPath);
  fileToUpload.mv(uploadPath);
  newPost["poza"] = newFileName;
  postModel.addPost(newPost, (err: Error, postId: number) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(200).json({ message: "Datele au fost introduse cu succes" });
  });
});

export { postRouter };