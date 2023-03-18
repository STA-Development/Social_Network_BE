import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Users } from "./entities/users";
import { typeName } from "../libs/errors/texts";
import { Photos } from "./entities/photos";
import { Posts } from "./entities/posts";

dotenv.config();

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DBMS_MYSQL = new DataSource({
  type: typeName,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Users, Photos, Posts],
  synchronize: true,
});
