import pool from "../database";
import { SQL } from "sql-template-strings";

interface ApplyJob {
  userId: string;
  jobId: string;
  name: string;
  email: string;
  userCV: { fileID: string; file: string };
}

export const applyJob = async (data: ApplyJob, id: string) => {
  let { userId, jobId, name, email, userCV } = data;

  try {
    const connection = await pool.connect();

    try {
      await connection.query("begin");

      await connection.query(
        SQL`INSERT 
        INTO applications 
        (
        id_,
        user_id, 
        job_id, 
        name, 
        email) 
        VALUES 
        (
          ${id},
          ${userId}, 
          ${jobId}, 
          ${name}, 
          ${email}
        )`
      );

      await connection.query(
        SQL`INSERT INTO files (application_id, cv_id, cv_url) VALUES (${id}, ${userCV.fileID}, ${userCV.file})`
      );

      await connection.query("commit");
    } catch (error) {
      console.log(error)
      await connection.query("rollback");
      throw new Error("Database update error.");
    }
  } catch (error) {
    console.log(error);
    throw new Error("Database update error.");
  }
};
