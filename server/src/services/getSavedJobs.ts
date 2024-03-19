import pool from "../database";
import { SQL } from "sql-template-strings";

const transformedRows = (rows: any) => {
  return rows.map(
    ({
      job_id,
      job_title,
      employment_type,
      salary_range,
      salary_type,
      seniority_level,
      seniority_type,
      about_us,
      date_posted,
      date_saved,
      ...row
    }: {
      job_id: string;
      job_title: string;
      employment_type: string;
      salary_range: string;
      salary_type: string;
      seniority_level: string;
      seniority_type: string;
      about_us: string;
      date_posted: string;
      date_saved: string;
    }) => ({
      jobId: job_id,
      jobTitle: job_title,
      employmentType: employment_type,
      salaryRange: salary_range,
      salaryType: salary_type,
      seniorityLevel: seniority_level,
      seniorityType: seniority_type,
      aboutUs: about_us,
      datePosted: date_posted,
      dateSaved: date_saved,
      ...row,
    })
  );
};

export const getSavedJobs = async (userId: string) => {
  try {

    const res = await pool.query(
      SQL`SELECT jobs.id as job_id, 
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
      requirements, 
      benefits,
      saved_jobs.date_saved
      FROM jobs 
      INNER JOIN saved_jobs ON jobs.id = saved_jobs.job_id
      WHERE saved_jobs.user_id = ${userId}`
    );

    return transformedRows(res.rows);
  } catch (error) {
    console.log(error);
    throw new Error("Database update error.");
  }
};
