import express from "express";
import { createJob } from "../controllers/createJob";
import { getJobs } from "../controllers/getJobs";
import { uploadCompanyLogo } from "../controllers/images";
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

export default router;

// jobValidation(addJobSchema),
