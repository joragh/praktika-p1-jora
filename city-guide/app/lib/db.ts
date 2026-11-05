import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);
const mysqlBin = process.env.MYSQL_BIN ?? "C:\\Program Files\\MySQL\\MySQL Server 8.0\\bin\\mysql.exe";
const config = () => ({
  host: process.env.DB_HOST ?? "localhost",
  port: process.env.DB_PORT ?? "3306",
  user: process.env.DB_USER ?? "root",
  password: process.env.DB_PASSWORD ?? "",
  database: process.env.DB_NAME ?? "city_guide",
});

let setupPromise: Promise<void> | undefined;

export const sql = (value: unknown) => `'${String(value ?? "").replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'`;

function databaseName() {
  const name = config().database;
  if (!/^[A-Za-z0-9_]+$/.test(name)) {
    throw new Error("DB_NAME may only contain letters, numbers, and underscores.");
  }
  return name;
}

async function mysql(statement: string, useDatabase = true) {
  const db = config();
  const args = ["--host", db.host, "--port", db.port, "--user", db.user];
  if (useDatabase) args.push("--database", databaseName());
  args.push("--batch", "--skip-column-names", "--raw", "-e", statement);
  return execFileAsync(mysqlBin, args, { env: { ...process.env, MYSQL_PWD: db.password } });
}

async function ensureDatabase() {
  const name = databaseName();
  await mysql(`CREATE DATABASE IF NOT EXISTS \`${name}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`, false);
  await mysql(`
    CREATE TABLE IF NOT EXISTS owners (
      id CHAR(36) PRIMARY KEY,
      first_name VARCHAR(80) NOT NULL,
      last_name VARCHAR(80) NOT NULL,
      email VARCHAR(254) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      plan ENUM('free','premium') NOT NULL DEFAULT 'free',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS businesses (
      id CHAR(36) PRIMARY KEY,
      owner_id CHAR(36) NOT NULL,
      name VARCHAR(160) NOT NULL,
      category VARCHAR(100) NOT NULL,
      google_maps_url VARCHAR(2048) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      address VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      opening_hours VARCHAR(140) NULL,
      website VARCHAR(2048) NULL,
      is_promoted BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      CONSTRAINT fk_business_owner FOREIGN KEY (owner_id) REFERENCES owners(id) ON DELETE CASCADE
    );
  `);
}

async function ready() {
  setupPromise ??= ensureDatabase();
  await setupPromise;
}

export async function run(statement: string) {
  await ready();
  await mysql(statement);
}

export async function rows<T>(statement: string): Promise<T[]> {
  await ready();
  const { stdout } = await mysql(statement);
  const value = stdout.trim();
  return value ? (JSON.parse(value) as T[]) : [];
}
