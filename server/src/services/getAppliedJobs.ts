import pool from "../database";
import { SQL } from "sql-template-strings";

export const getAppliedJobs = async (userId: string) => {
  try {
    const appliedJobs = await pool.query(SQL`
      SELECT 
      id, 
      user_id, 
      job_id, 
      name, 
      email, 
      date_applied 
      FROM applications
      LEFT JOIN files ON applications.id = files.application_id
      WHERE user_id = ${userId}
      `);

    return appliedJobs.rows;
  } catch (error) {
    console.log(error);
    throw new Error("Database update error.");
  }
};
