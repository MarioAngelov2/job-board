import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

pool.connect((err) => {
  if (err) throw err;

  const handleConnectionError = (err: any) => {
    console.error("Error connecting to PostgreSQL:", err.message);
  };

  setTimeout(() => {
    console.log("Attempting to connect to PostgreSQL...");
    pool.connect((connectErr, client) => {
      if (connectErr) {
        handleConnectionError(connectErr); // Recursively handle reconnection errors
      } else {
        console.log("Connected to PostgreSQL successfully");
        client.release(); // Release the client back to the pool
      }
    });
  }, 5000);
});

export default pool;
