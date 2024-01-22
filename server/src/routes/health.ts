import express from "express";
import { getHealth } from "../controllers/index";

export const healthRouter = express.Router();

healthRouter.use("/health", getHealth);

