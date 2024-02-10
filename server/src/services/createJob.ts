import pool from "../database";
import { SQL } from "sql-template-strings";
import { Job } from "../types";

export const addJob = async (data: Job) => {
  const {
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
  } = data;

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
          salary_range, 
          salary_type, 
          seniority_level, 
          seniority_type, 
          tasks, 
          about_us,
          requirements, 
          benefits, 
          final_words) VALUES (
            ${id},
            ${company}, 
            ${jobTitle}, 
            ${location}, 
            ${employmentType}, 
            ${salaryRange}, 
            ${salaryType}, 
            ${seniorityLevel}, 
            ${seniorityType}, 
            ${tasks}, 
            ${aboutUs},
            ${requirements}, 
            ${benefits}, 
            ${finalWords}
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
