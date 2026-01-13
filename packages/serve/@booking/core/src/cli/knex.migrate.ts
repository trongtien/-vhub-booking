import { knex, type Knex } from "knex";
import { exit } from "node:process";
import registerConfig from "./knex.register-config";

type MigrateConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  folder: string;
};

export default async function migrate(config: Partial<MigrateConfig>) {
  await validateConfig(config);
  const cf = await registerConfig(config as MigrateConfig);
  const dbClient = knex(cf);

  try {
    const [batch, migrations] = await dbClient.migrate.latest();

    console.log("==> Database migration completed batch", batch);
    console.log("==> Database migration completed migrations", migrations);
  } catch (error) {
    console.error("==> Migrate error config", error);
  } finally {
    dbClient.destroy();
  }
}

async function validateConfig(config: Partial<MigrateConfig>) {
  const { host, port, user, password, database, folder } = config;
  const errorValid = new Map<string, string>();

  if (host?.length === 0) {
    console.log("===> Config host current", host);
    errorValid.set("host", "Host required");
  }

  if (typeof port !== "number" || port?.toString()?.length === 0) {
    console.log("===> Config port current", port);
    errorValid.set("port", "Port required");
  }

  if (user?.length === 0) {
    console.log("===> Config user current", user);
    errorValid.set("user", "User required");
  }

  if (password?.length === 0) {
    console.log("===> Config password current", password);
    errorValid.set("password", "Password required");
  }

  if (database?.length === 0) {
    console.log("===> Config database current", database);
    errorValid.set("database", "database required");
  }

  if (folder?.length === 0) {
    console.log("===> Config folder current", folder);
    errorValid.set("folder", "folder required");
  }

  if (errorValid?.size > 0) {
    console.error("==> Migrate error validate config");
    console.error("===> ", JSON.stringify(errorValid));
    exit(1);
  }
}
