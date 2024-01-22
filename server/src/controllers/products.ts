import { Request, Response } from "express";
import { createProduct, getProducts } from "../services/products";

export const addProducts = async (req: Request, res: Response) => {
  const { name, price } = req.body;

  const products = await createProduct({ name, price });
  console.log(products);

  return res.json(products);
};

export const fetchProducts = async (req: Request, res: Response) => {
  const products = await getProducts();

  return res.json(products);
}