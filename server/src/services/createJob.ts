import pool from "../database";
import { SQL } from "sql-template-strings";
import { Job } from "../types";

export const addJob = async (data: Job) => {
  let {
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
    companyLogo,
    userId,
  } = data;

  const salaryNumber = Number(salaryRange);
  
  if (salaryNumber >= 0 && salaryNumber <= 2000) {
    salaryType = "lowRange";
  } else if (Number(salaryNumber) > 2000 && Number(salaryNumber) <= 3500) {
    salaryType = "midRange";
  } else if (Number(salaryNumber) > 3500) {
    salaryType = "highRange";
  }

  if (seniorityLevel === "intern") {
    seniorityType = "Intern";
  } else if (seniorityLevel === "junior") {
    seniorityType = "Junior";
  } else if (seniorityLevel === "mid") {
    seniorityType = "Mid";
  } else if (seniorityLevel === "senior") {
    seniorityType = "Senior";
  } else if (seniorityLevel === "teamLead") {
    seniorityType = "Team Lead";
  }

  try {
    const connection = await pool.connect();

    try {
      await connection.query("begin");

      await connection.query(
        SQL`INSERT INTO jobs (
          id,
          company, 
          job_title, 
          location, 
          employment_type, 
          salary_type, 
          seniority_level, 
          seniority_type, 
          tasks, 
          about_us,
          requirements, 
          benefits, 
          user_id,
          salary_range) VALUES (
            ${id},
            ${company}, 
            ${jobTitle}, 
            ${location}, 
            ${employmentType}, 
            ${salaryType}, 
            ${seniorityLevel}, 
            ${seniorityType}, 
            ${tasks}, 
            ${aboutUs},
            ${requirements}, 
            ${benefits}, 
            ${userId},
            ${salaryRange}
            )`
      );

      const { imageId, imageUrl } = companyLogo;

      await connection.query(
        SQL`INSERT INTO images (job_id, image_id, url) VALUES (${id}, ${imageId}, ${imageUrl})`
      );

      await connection.query("commit");
    } catch (error) {
      await connection.query("rollback");
      throw new Error("Database update error.");
    }
  } catch (error) {
    console.log(error);
    throw new Error("Database update error.");
  }
};
