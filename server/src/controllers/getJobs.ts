import { Request, Response } from "express";
import { fetchJobs } from "../services/getJobs";

export const getJobs = async (req: Request, res: Response) => {
  try {
    const { position, location } = req.query;

    const positionStr =
      typeof position === "string" ? position : "";
    const locationStr =
      typeof location === "string" ? location : "";

    const jobs = await fetchJobs(positionStr, locationStr);

    return res.json(jobs);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};
