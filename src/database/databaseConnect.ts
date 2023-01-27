import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Users } from "./entities/users";
import { typeName } from "../libs/errors/texts";
dotenv.config();

export const connectDB = new DataSource({
  type: typeName,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Users],
  synchronize: true,
});
