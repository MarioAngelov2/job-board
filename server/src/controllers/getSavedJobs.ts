import { Request, Response } from "express";
import { getSavedJobs } from "../services/getSavedJobs";

export const savedJobsController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    const jobs = await getSavedJobs(userId);

    res.status(200).json(jobs);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};
