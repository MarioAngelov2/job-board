import express from "express";
import { createJob } from "../controllers/createJob";
import { getJobs } from "../controllers/getJobs";

const router = express.Router();

router.post("/createJob", createJob);
router.get("/getJobs", getJobs);

export default router;
