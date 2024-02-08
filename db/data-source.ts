import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource, DataSourceOptions } from "typeorm";
require("dotenv").config();
let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD ,PGPORT} = process.env;

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: PGHOST,
  port: Number(PGPORT),
  username: PGUSER,
  password: PGPASSWORD,
  database: PGDATABASE,
  ssl: true,
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  migrations: [`dist/db/migrations/*{.ts,.js}`],
  logging: false,
  synchronize: false,
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
