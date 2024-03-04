import pool from "../database";
import { SQL } from "sql-template-strings";

export const fetchJobById = async (id: string) => {
  try {
    const job = await pool.query(
      SQL`SELECT id, 
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
      requirements, 
      benefits, 
      images.url as logo 
      FROM jobs 
      LEFT JOIN images ON jobs.id = images.job_id 
      WHERE job_id = ${id}`
    );

    return job.rows;
  } catch (error) {
    console.log(error);
    throw new Error("Database update error.");
  }
};
