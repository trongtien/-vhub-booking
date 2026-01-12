import { knex, type Knex } from "knex";
import { exit } from "node:process";

export type MigrateConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  folder: string;
};

export default async function registerConfig(config: MigrateConfig) {
  const { host, port, user, password, database, folder } = config;
  console.log("==> Migrate run with config");
  console.log("===> Config connect database", JSON.stringify(config));

  await validateConfig(config);

  const cf: Knex.Config = {
    client: "pg",
    connection: {
      host: host,
      port: port,
      user: user,
      password: password,
      database: database,
    },
    migrations: {
      directory: folder,
      tableName: "knex_migrations",
      extension: "ts",
    },
    pool: {
      min: 2,
      max: 10,
    },
  };

  return cf;
}

async function validateConfig(config: MigrateConfig) {
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
