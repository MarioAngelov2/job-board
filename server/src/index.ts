import express from "express";
import http from "http";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import router from "./routes/index";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(bodyParser.json());
app.use(router);

const server = http.createServer(app);

server.listen(8080, () => {
  console.log("Server listening on port 8080");
});
