import pool from "../database";
import { SQL } from "sql-template-strings";

export const fetchJobs = async () => {
  try {
    const jobs = await pool.query(SQL`SELECT 
    id, 
    company, 
    job_title,
    location,
    employment_type,
    salary_range,
    salary_type,
    seniority_level,
    seniority_type,
    about_us,
    date_posted,
    tasks,
    final_words,
    about_us,
    requirements,
    benefits,
    images.url as image_url
    FROM jobs
    INNER JOIN (SELECT job_id, url FROM images) AS images
    ON jobs.id = images.job_id`);

    return jobs.rows;
  } catch (error) {
    console.log(error);
    throw new Error("Database update error.");
  }
};
