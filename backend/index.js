import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/route.js";
import bodyParser from "body-parser";

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

// body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// cors middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
// routes

app.use("/api", router);

app.listen(PORT, () => console.log(`Server listening on PORT=${PORT}`));
