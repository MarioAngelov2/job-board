import pool from "../database";
import { SQL } from "sql-template-strings";

export const fetchJobs = async () => {
  try {
    const jobs = await pool.query(SQL`SELECT * FROM jobs`);

    return jobs.rows;
  } catch (error) {
    console.log(error);
    throw new Error("Database update error.");
  }
};
