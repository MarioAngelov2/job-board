import pool from "../database";
import { SQL } from "sql-template-strings";

const transformedRows = (rows: any) => {
  return rows.map(
    ({
      id_,
      applicant_id,
      job_id,
      name,
      email,
      date_applied,
      company,
      job_title,
      cv_url,
      cv_id,
      ...row
    }: {
      id_: string;
      applicant_id: string;
      job_id: string;
      name: string;
      email: string;
      date_applied: string;
      company: string;
      job_title: string;
      cv_url: string;
      cv_id: string;
    }) => ({
      id: id_,
      applicantId: applicant_id,
      jobId: job_id,
      name,
      email,
      dateApplied: date_applied,
      company,
      jobTitle: job_title,
      userCV: {
        file: cv_url,
        fileID: cv_id,
      },
      ...row,
    })
  );
};

export const getAppliedJobs = async (userId: string) => {
  try {
    const appliedJobs = await pool.query(SQL`
      SELECT 
      id_,
      applicant_id, 
      job_id, 
      name, 
      email, 
      date_applied,
      jobs.company,
      jobs.job_title,
      files.cv_url,
      files.cv_id
      FROM applications
      INNER JOIN files ON applications.id_ = files.application_id
      INNER JOIN jobs ON applications.job_id = jobs.id
      WHERE user_id = ${userId}
      `);

    return transformedRows(appliedJobs.rows);
  } catch (error) {
    console.log(error);
    throw new Error("Database update error.");
  }
};
