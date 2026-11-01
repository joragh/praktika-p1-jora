import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);
const mysqlBin = process.env.MYSQL_BIN ?? "C:\\Program Files\\MySQL\\MySQL Server 8.0\\bin\\mysql.exe";
const config = () => ({ host: process.env.DB_HOST ?? "localhost", port: process.env.DB_PORT ?? "3306", user: process.env.DB_USER ?? "root", password: process.env.DB_PASSWORD ?? "", database: process.env.DB_NAME ?? "city_guide" });
export const sql = (value: unknown) => `'${String(value ?? "").replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'`;
async function mysql(statement: string) { const db = config(); return execFileAsync(mysqlBin, ["--host", db.host, "--port", db.port, "--user", db.user, "--database", db.database, "--batch", "--skip-column-names", "--raw", "-e", statement], { env: { ...process.env, MYSQL_PWD: db.password } }); }
export async function run(statement: string) { await mysql(statement); }
export async function rows<T>(statement: string): Promise<T[]> { const { stdout } = await mysql(statement); const value = stdout.trim(); return value ? JSON.parse(value) as T[] : []; }
