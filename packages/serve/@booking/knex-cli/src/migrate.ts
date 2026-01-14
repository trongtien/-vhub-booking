import { knex } from "knex";
import { registerConfig } from "./register-config";
import { validateConfig } from "./validate-config";

import type { MigrateConfig } from "./type";

export default async function migrate(config: Partial<MigrateConfig>) {
  await validateConfig(config);
  const cf = await registerConfig({
    ...config as MigrateConfig,
    tableNameMigration: config.tableName,
  });
  const dbClient = knex(cf);

  try {
    const [batch, migrations] = await dbClient.migrate.latest();
    console.log("==> Migrate database success");

    console.log("    --> Database migration completed batch", batch);
    console.log("    --> Database migration completed migrations");
    for (const migration of migrations) {
      console.log("       --> ", migration);
    }
  } catch (error) {
    console.error("==> Migrate error config", error);
  } finally {
    dbClient.destroy();
  }
}