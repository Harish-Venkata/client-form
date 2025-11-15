import express from "express";
import dotenv from "dotenv";
dotenv.config("/.env");
import cors from "cors";
import connectDB from "./utils/db.js";
import clientRoutes from "./routes/clientRoutes.js";

const app = express();
const port = process.env.PORT || 7001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1", clientRoutes);

connectDB();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
