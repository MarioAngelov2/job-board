import { Request, Response } from "express";
import { getAppliedJobs } from "../services/getAppliedJobs";

export const getAppliedJobsController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    const appliedJobs = await getAppliedJobs(userId);

    return res.json(appliedJobs);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};
