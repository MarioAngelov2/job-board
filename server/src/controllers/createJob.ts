import { Request, Response } from "express";
import { addJob } from "../services/createJob";
import { v4 as uuidv4 } from "uuid";

export const createJob = async (req: Request, res: Response) => {

  try {
    const {
      company,
      jobTitle,
      location,
      employmentType,
      salaryRange,
      salaryType,
      seniorityLevel,
      seniorityType,
      aboutUs,
      tasks,
      requirements,
      benefits,
      finalWords,
      companyLogo,
    } = req.body;

    const id = uuidv4();

    await addJob({
      id,
      company,
      jobTitle,
      location,
      employmentType,
      salaryRange,
      salaryType,
      seniorityLevel,
      seniorityType,
      aboutUs,
      tasks,
      requirements,
      benefits,
      finalWords,
      companyLogo,
    });

    return res.json("Job listing successfully created");
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};
