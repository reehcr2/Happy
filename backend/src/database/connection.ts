import { DataSource } from "typeorm";
import path from "path";

export const AppDataSource = new DataSource({
  type: "better-sqlite3",
  database: "./src/database/database.sqlite",
  synchronize: false, // false quando usar migrations
  logging: false,
  entities: [path.join(__dirname, "..", "models", "*.{ts,js}")],
  migrations: [path.join(__dirname, "migrations", "*.{ts,js}")],
});
