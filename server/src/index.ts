import express from "express";
import http from "http";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import router from "./routes/index";
import dotenv from "dotenv";
dotenv.config();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      credentials: true,
      origin: process.env.DEVELOPMENT_ORIGIN,
    })
  );
} else if (process.env.NODE_ENV === "production") {
  app.use(
    cors({
      credentials: true,
      origin: process.env.PRODUCTION_ORIGIN,
    })
  );
}

app.use(compression());
app.use(bodyParser.json());
app.use(router);

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
