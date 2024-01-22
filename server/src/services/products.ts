import pool from "../database";
import { SQL } from "sql-template-strings";

export const createProduct = async (data: any) => {
  const { name, price } = data;

  try {
    const products = await pool.query(SQL`
      INSERT INTO products (name, price) VALUES (${name}, ${price})
    `);

    console.log('rows', products)
    return products.rows;
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async () => {
  try {
    const products = await pool.query(SQL`
      SELECT * FROM products
    `);

    return products.rows;
  } catch (error) {
    console.log(error)
  }
}
