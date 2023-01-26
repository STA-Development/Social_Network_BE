import { connectDB } from "./database/databaseConnect";
import { router } from "./routes/usersRoutes";

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(bodyParser.json());
const localAddress = "http://localhost:3000";
app.use(cors({ origin: localAddress }));
app.use("/api/usersInformation", router);

connectDB
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized");
  })
  .catch((err) => {
    console.error("Data source initialized error ", err);
  });
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
