import { Request, Response } from "express";
import { fetchJobById } from "../services/getJob";

export const getJobById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const job = await fetchJobById(id);

    return res.json(job);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};
