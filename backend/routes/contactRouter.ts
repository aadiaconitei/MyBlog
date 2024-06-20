import express, { Request, Response } from "express";
import * as contactModel from "../models/contact";
import { Contact } from "../types/Contact";

const contactRouter = express.Router();

contactRouter.get("/", async (req: Request, res: Response) => {
  contactModel.findAll((err: Error, messages: Contact[]) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }
    res.status(200).json({ data: messages });
  });
});

contactRouter.get("/:id", async (req: Request, res: Response) => {
  const contactId: number = Number(req.params.id);
  contactModel.findOne(contactId, (err: Error, message: Contact) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }
    res.status(200).json({ data: message });
  });
});
export { contactRouter };
