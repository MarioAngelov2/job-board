import { Request, Response } from "express";
import { applyJob } from "../services/applyJob";
import { v4 as uuidv4 } from "uuid";

export const applyJobController = async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    const data = req.body;

    const id = uuidv4();

    await applyJob(data, id);

    return res.json("Job application successfully submitted");
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};
