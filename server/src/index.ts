import express from "express";
import http from "http";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import router from "./routes/index";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
  })
);


app.use(compression());
app.use(bodyParser.json());
app.use(router);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/src/index.html'))
})

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
