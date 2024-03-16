import { Request, Response } from "express";
import { deleteSavedJob } from "../services/deleteSavedJob";

export const deleteSavedJobController = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const response = await deleteSavedJob(data.jobId);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};
