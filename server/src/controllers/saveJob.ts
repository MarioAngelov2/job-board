import { Request, Response } from "express";
import { saveJob } from "../services/saveJob";

export const saveJobController = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    await saveJob(data);

    return res.status(200).send("Job saved.");
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};
