// Starts an embedded local PostgreSQL (no system install / Docker needed).
// Data lives in .pgdata/ inside the project. Run: npm run db:start
import EmbeddedPostgres from "embedded-postgres";
import "dotenv/config";

const pg = new EmbeddedPostgres({
  databaseDir: "./.pgdata",
  user: "postgres",
  password: "postgres",
  port: 5432,
  persistent: true,
});

async function main() {
  await pg.initialise();
  await pg.start();
  try {
    await pg.createDatabase("app_db");
    console.log("Created database app_db");
  } catch {
    console.log("Database app_db already exists");
  }
  console.log("PostgreSQL running on postgresql://postgres:postgres@127.0.0.1:5432/app_db");
  // Keep the process alive so the server stays up for `npm run dev`.
  process.on("SIGINT", async () => {
    await pg.stop();
    process.exit(0);
  });
}

main().catch(async (err) => {
  console.error(err);
  process.exit(1);
});
