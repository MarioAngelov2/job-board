import express from "express";
import { healthRouter } from "./health";
import { addProducts, fetchProducts } from "../controllers/products";

const router = express.Router();

router.use(healthRouter);
router.post("/products", addProducts);
router.get("/getProducts", fetchProducts);

export default router;
