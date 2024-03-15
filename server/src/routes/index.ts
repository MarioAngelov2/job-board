import express from "express";
import { createJob } from "../controllers/createJob";
import { getJobs } from "../controllers/getJobs";
import { getJobById } from "../controllers/getJob";
import { uploadCompanyLogo } from "../controllers/images";
import { saveJobController } from "../controllers/saveJob";
import { savedJobsController } from "../controllers/getSavedJobs";
import { addJobSchema, jobValidation } from "../middleware/jobValidation";
import multer from "multer";

const router = express.Router();

router.post("/jobs/createJob", jobValidation(addJobSchema), createJob);
router.get("/jobs/getJobs", getJobs);
router.post(
  "/images/upload-image",
  multer().single("image"),
  uploadCompanyLogo
);
router.get("/jobs/getJob/:id", getJobById);
router.post("/jobs/saveJob", saveJobController);
router.post("/jobs/savedJobsList", savedJobsController);

export default router;
