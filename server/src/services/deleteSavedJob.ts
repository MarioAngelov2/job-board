import pool from "../database";
import { SQL } from "sql-template-strings";

export const deleteSavedJob = async (jobId: string) => {
  console.log(jobId)
  try {
    await pool.query(SQL`DELETE FROM saved_jobs WHERE job_id = ${jobId}`);

    return "Job deleted successfully.";
  } catch (error) {
    console.log(error);
    throw new Error("Database update error.");
  }
};
