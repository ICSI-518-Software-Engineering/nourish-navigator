import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import db from "./lib/db";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Intiate db
db();

app.use("/auth", userRoutes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
