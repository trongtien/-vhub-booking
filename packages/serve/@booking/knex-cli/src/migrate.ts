import { knex } from "knex";
import { registerConfig } from "./register-config";
import { validateConfig } from "./validate-config";

import type { MigrateConfig } from "./type";
import { Debug } from "./debug-console";

export default async function migrate(config: Partial<MigrateConfig>) {
  await validateConfig(config);
  const cf = await registerConfig({
    ...config as MigrateConfig,
    tableNameMigration: config.tableName,
  });
  const dbClient = knex(cf);

  try {
    const [batch, migrations] = await dbClient.migrate.latest();
    Debug.Log("==> Migrate database success");

    Debug.Log(`    --> Database migration completed batch ${batch}`);
    Debug.Log(`    --> Database migration completed migrations`);
    for (const migration of migrations) {
      Debug.Log(`       --> ${migration}`);
    }
  } catch (error) {
    Debug.Error(`==> Migrate error config ${error}`);
  } finally {
    Debug.Log(`==> Database destroy`);
    dbClient.destroy();
  }
}