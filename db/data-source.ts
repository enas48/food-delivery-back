import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource, DataSourceOptions } from "typeorm";
require("dotenv").config();
let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: PGHOST,
  port: 5432,
  username: PGUSER,
  password: PGPASSWORD,
  database: PGDATABASE,
  ssl: true,
  entities: [],
  migrations: [],
  logging: false,
  synchronize: false,
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
