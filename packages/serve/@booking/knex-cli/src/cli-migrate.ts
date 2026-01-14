import { parseArgs } from "./cli-common";
import { envObject } from "./env-object";
import { resolve } from "node:path";

import type { MigrateConfig } from "./type";
import migrate from "./migrate";

export default () => {
  if (require.main !== module) return;

  const args = parseArgs(process.argv.slice(2));

  if (args['path-env']) {
    const envPath = resolve(process.cwd(), args['path-env']);
    console.log(`==> Loading environment from: ${envPath}`);
    envObject(envPath);
  }

  const config: Partial<MigrateConfig> = {
    host: args.host || process.env.DATABASE_HOST || 'localhost',
    port: args.port ? Number(args.port) : Number(process.env.DATABASE_PORT) || 5432,
    user: args.user || process.env.DATABASE_USERNAME || 'postgres',
    password: args.password || process.env.DATABASE_PASSWORD,
    database: args.database || process.env.DATABASE_NAME,
    folder: args.folder ? resolve(process.cwd(), args.folder) : resolve(process.cwd(), './migrations'),
  };

  console.log('==> Running migration with config');
  console.log('   --> host: ', config.host);
  console.log('   --> port: ', config.port);
  console.log('   --> database: ', config.database);
  console.log('   --> folder: ', config.folder);

  migrate(config).then(() => {
    process.exit(0);
  }).catch((error) => {
    console.error('==> Migration failed:');
    console.error('   --> ', error);
    process.exit(1);
  });
}

// Execute when run as a script
if (require.main === module) {
  exports.default();
}
