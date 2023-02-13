import { connectDB } from "./database/databaseConnect";
import { router } from "./routes/usersRoutes";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import { localAddress } from "./libs/errors/texts";
dotenv.config();
const app = express();

app.use(express.static("./public/images"));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("./libs/storage/uploads"));
app.use(cors({ origin: localAddress }));
app.use("/api/usersInformation", router);

app.use(bodyParser.urlencoded({ extended: true }));
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
