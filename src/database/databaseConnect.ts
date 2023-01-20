import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Users } from "./entities/users";
dotenv.config();
export const connectDB = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Users],
  synchronize: true,
});
