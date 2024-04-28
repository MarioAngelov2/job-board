import { Request, Response } from "express";
import { fetchJobs } from "../services/getJobs";

export const getJobs = async (req: Request, res: Response) => {
  try {
    const position: string | undefined = req.query.position as string;
    const location: string | undefined = req.query.location as string;
    const limit: number | undefined = parseInt(req.query.limit as string);
    const offset: number | undefined = parseInt(req.query.offset as string);

    let defaultOffset = offset !== undefined ? offset : 0;
    let defaultLimit = limit !== undefined ? limit : 7;

    const jobs = await fetchJobs(
      position,
      location,
      defaultOffset,
      defaultLimit
    );

    return res.json({ data: jobs.data, totalCount: jobs.totalCount });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};
