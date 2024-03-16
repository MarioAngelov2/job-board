import { uploadFile } from "../services/uploadFile";
import { Request, Response } from "express";
import multer from "multer";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export const uploadFileController = async (req: MulterRequest, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file provided" });
  }

  try {
    const imageData = await uploadFile(req.file);

    return res.status(200).json(imageData);
  } catch (error) {
    return res.status(500);
  }
};
