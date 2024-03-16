import pool from "../database";
import { SQL } from "sql-template-strings";

interface SaveJobData {
  userId: string;
  jobId: string;
}

export const saveJob = async (data: SaveJobData): Promise<string> => {
  let { userId, jobId } = data;

  try {

    const isAdded = await pool.query(SQL`
    SELECT job_id FROM saved_jobs WHERE user_id = ${userId} AND job_id = ${jobId}`);

    if (isAdded.rows.length > 0) {
      throw new Error("Job already saved.");
    }

   const res = await pool.query(SQL`
    INSERT INTO saved_jobs (user_id, job_id) VALUES (${userId}, ${jobId}) RETURNING job_id`);

    return res.rows[0].job_id;
  } catch (error) {
    console.log(error);
    throw new Error("Database update error.");
  }
};
