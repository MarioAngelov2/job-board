import pool from "../database";
import { SQL } from "sql-template-strings";

export const saveJob = async (data: any) => {
  let { userId, jobId } = data;

  try {
    await pool.query(SQL`
    INSERT INTO saved_jobs (user_id, job_id) VALUES (${userId}, ${jobId})`);
  } catch (error) {
    console.log(error);
    throw new Error("Database update error.");
  }
};
