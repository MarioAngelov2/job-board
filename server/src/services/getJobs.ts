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
      ...row
    }: {
      job_title: string;
      employment_type: string;
      salary_range: string;
      salary_type: string;
      seniority_level: string;
      seniority_type: string;
      about_us: string;
      date_posted: string;
    }) => ({
      jobTitle: job_title,
      employmentType: employment_type,
      salaryRange: salary_range,
      salaryType: salary_type,
      seniorityLevel: seniority_level,
      seniorityType: seniority_type,
      aboutUs: about_us,
      datePosted: date_posted,
      ...row,
    })
  );
};

export const fetchJobs = async (
  position: string,
  location: string,
  offset: number,
  limit: number
) => {
  try {
    const jobs = SQL` SELECT 
    id, 
    company, 
    job_title,
    location,
    employment_type,
    salary_type,
    seniority_level,
    seniority_type,
    about_us,
    date_posted,
    tasks,
    final_words,
    requirements,
    benefits,
    salary_range,
    images.url as logo
    FROM jobs
    INNER JOIN (SELECT job_id, url FROM images) AS images
    ON jobs.id = images.job_id`;

    if (position) {
      jobs.append(SQL` WHERE job_title ILIKE ${"%" + position + "%"}`);
    }

    if (location) {
      if (position) {
        jobs.append(SQL` AND location ILIKE ${"%" + location + "%"}`);
      } else {
        jobs.append(SQL` WHERE location ILIKE ${"%" + location + "%"}`);
      }
    }

    const countQuery = SQL`SELECT COUNT(*) from jobs`;
    if (position || location) {
      countQuery.append(SQL` WHERE `);
    }
    if (position) {
      countQuery.append(SQL` job_title ILIKE ${"%" + position + "%"}`);

      if (location) {
        countQuery.append(SQL` AND location ILIKE ${"%" + location + "%"}`);
      }
    }

    jobs.append(SQL` ORDER BY id LIMIT ${limit} OFFSET ${offset}`);

    const countResult = await pool.query(countQuery);
    const totalCount = countResult.rows[0].count;

    const { rows } = await pool.query(jobs);

    return { totalCount, data: transformedRows(rows) };
  } catch (error) {
    console.log(error);
    throw new Error("Database update error.");
  }
};
