import knex from "knex";
import type { MigrateConfig } from "./knex.register-config";
import registerConfig from "./knex.register-config";

export default async function rollback(config: MigrateConfig) {
  console.log("==> Run rollback database");
  const cf = await registerConfig(config);
  const dbClient = knex(cf);
  try {
    await dbClient.migrate.rollback(undefined, true);

    console.log("==> Rollback database success");
  } catch (error) {
    console.error("==> Rollback database error ");
    console.error("===> ", error);
    dbClient.destroy();
  }
}
