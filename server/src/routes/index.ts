import express from "express";
import { createJob } from "../controllers/createJob";
import { getJobs } from "../controllers/getJobs";
import { addJobSchema, jobValidation } from "../middleware/jobValidation";

const router = express.Router();

router.post("/jobs/createJob", jobValidation(addJobSchema), createJob);
router.get("/jobs/getJobs", getJobs);

export default router;
