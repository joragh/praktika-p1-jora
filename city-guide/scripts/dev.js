const net = require("net");
const { existsSync } = require("fs");
const { spawn, spawnSync } = require("child_process");
const { join } = require("path");

const root = join(__dirname, "..");
const mysqlServer = process.env.MYSQL_SERVER_BIN ?? "C:\\Program Files\\MySQL\\MySQL Server 8.0\\bin\\mysqld.exe";
const mysqlBase = process.env.MYSQL_BASE_DIR ?? "C:\\Program Files\\MySQL\\MySQL Server 8.0";
const dataDirectory = join(root, "database", "mysql-data");
const port = Number(process.env.DB_PORT ?? 3307);

function isListening() {
  return new Promise((resolve) => {
    const socket = net.createConnection({ host: "127.0.0.1", port });
    socket.once("connect", () => {
      socket.destroy();
      resolve(true);
    });
    socket.once("error", () => resolve(false));
  });
}

async function waitForMySql() {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    if (await isListening()) return;
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error("The project-local MySQL server did not start.");
}

async function ensureMySql() {
  if (await isListening()) return;
  if (!existsSync(mysqlServer)) {
    throw new Error(`MySQL Server was not found at ${mysqlServer}. Set MYSQL_SERVER_BIN to its mysqld.exe path.`);
  }

  if (!existsSync(dataDirectory)) {
    const initialized = spawnSync(mysqlServer, [
      "--no-defaults",
      "--initialize-insecure",
      `--basedir=${mysqlBase}`,
      `--datadir=${dataDirectory}`,
    ], { stdio: "inherit" });
    if (initialized.status !== 0) throw new Error("Unable to initialize the project-local MySQL data directory.");
  }

  const server = spawn(mysqlServer, [
    "--no-defaults",
    `--basedir=${mysqlBase}`,
    `--datadir=${dataDirectory}`,
    `--port=${port}`,
    "--bind-address=127.0.0.1",
  ], { detached: true, stdio: "ignore" });
  server.unref();
  await waitForMySql();
}

async function main() {
  await ensureMySql();
  const next = spawn(process.execPath, [join(root, "node_modules", "next", "dist", "bin", "next"), "dev"], { cwd: root, stdio: "inherit" });
  next.on("exit", (code) => process.exit(code ?? 0));
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
