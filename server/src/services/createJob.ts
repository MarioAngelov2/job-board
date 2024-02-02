import pool from "../database";
import { SQL } from "sql-template-strings";
import { Job } from "../types";

export const addJob = async (data: Job) => {
  const {
    id,
    company,
    jobTitle,
    location,
    employmentType,
    salaryRange,
    salaryType,
    seniorityLevel,
    seniorityType,
    aboutUs,
    tasks,
    requirements,
    benefits,
    finalWords,
  } = data;

  try {
    const jobs = await pool.query(
      SQL`INSERT INTO jobs (
        id,
        company, 
        job_title, 
        location, 
        employment_type, 
        salary_range, 
        salary_type, 
        seniority_level, 
        seniority_type, 
        tasks, 
        requirements, 
        benefits, 
        final_words) VALUES (
          ${id},
          ${company}, 
          ${jobTitle}, 
          ${location}, 
          ${employmentType}, 
          ${salaryRange}, 
          ${salaryType}, 
          ${seniorityLevel}, 
          ${seniorityType}, 
          ${tasks}, 
          ${requirements}, 
          ${benefits}, 
          ${finalWords}
          )`
    );

    console.log(jobs);
    return jobs.rows;
  } catch (error) {
    console.log(error);
    throw new Error("Database update error.")
  }
};
