import "dotenv/config";
import express from "express";
import path from "node:path";
import cors from "cors";
import "reflect-metadata";
import { AppDataSource } from "./database/connection";
import routes from "./routes";
import errorHandler from "./errors/handler";

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use(errorHandler);

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected!");
    app.listen(3333, () => console.log("Server running on port 3333"));
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });
