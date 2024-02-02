import express from "express";
import { createJob } from "../controllers/createJob";
import { getJobs } from "../controllers/getJobs";
import { addJobSchema, jobValidation } from "../middleware/jobValidation";

const router = express.Router();

router.post("/createJob", jobValidation(addJobSchema), createJob);
router.get("/getJobs", getJobs);

export default router;
