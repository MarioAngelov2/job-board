import { Request, Response } from "express";
import { fetchJobs } from "../services/getJobs";

export const getJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await fetchJobs();

    return res.json(jobs);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};
