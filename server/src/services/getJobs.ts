import pool from "../database";
import { SQL } from "sql-template-strings";

const transformedRows = (rows: any) => {
  return rows.map(
    ({
      job_title,
      employment_type,
      salary_range,
      salary_type,
      seniority_level,
      seniority_type,
      about_us,
      date_posted,
      final_words,
      ...row
    }: {
      job_title: string,
        employment_type: string,
        salary_range: string,
        salary_type: string,
        seniority_level: string,
        seniority_type: string,
        about_us: string,
        date_posted: string,
        final_words: string,
    }) => ({
      jobTitle: job_title,
      employmentType: employment_type,
      salaryRange: salary_range,
      salaryType: salary_type,
      seniorityLevel: seniority_level,
      seniorityType: seniority_type,
      aboutUs: about_us,
      datePosted: date_posted,
      finalWords: final_words,
      ...row,
    })
  );
};

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
    requirements,
    benefits,
    images.url as logo
    FROM jobs
    INNER JOIN (SELECT job_id, url FROM images) AS images
    ON jobs.id = images.job_id`);

    return transformedRows(jobs.rows);
  } catch (error) {
    console.log(error);
    throw new Error("Database update error.");
  }
};
