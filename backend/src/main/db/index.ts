import pg from "pg";
import dotenv from "dotenv";

dotenv.config({ path: [".env.local", ".env"] });

let pool: pg.Pool;
if (process.env.DB_PROD === "true") {
  pool = new pg.Pool({
    database: "task_manager",
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT!),
  });
} else {
  pool = new pg.Pool({
    database: "task_manager_test",
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT!),
  });
}

export { pool };
