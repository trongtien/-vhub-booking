import { parseArgs } from "./cli-common";
import { envObject } from "./env-object";
import { resolve } from "node:path";

import type { MigrateConfig } from "./type";
import rollback from "./rollback";

export default () => {
  if (require.main !== module) return;

  const args = parseArgs(process.argv.slice(2));

  // Load env file if specified
  if (args['path-env']) {
    const envPath = resolve(process.cwd(), args['path-env']);
    console.log(`==> Loading environment from: ${envPath}`);
    envObject(envPath);
  }

  const config: MigrateConfig = {
    host: args.host || process.env.DATABASE_HOST || 'localhost',
    port: args.port ? Number(args.port) : Number(process.env.DATABASE_PORT) || 5432,
    user: args.user || process.env.DATABASE_USERNAME || 'postgres',
    password: args.password || process.env.DATABASE_PASSWORD || '',
    database: args.database || process.env.DATABASE_NAME || '',
    folder: args.folder ? resolve(process.cwd(), args.folder) : resolve(process.cwd(), './migrations'),
  };

  console.log('==> Running rollback with config:', {
    host: config.host,
    port: config.port,
    database: config.database,
    folder: config.folder,
  });

  rollback(config).then(() => {
    process.exit(0);
  }).catch((error) => {
    console.error('==> Rollback failed:', error);
    process.exit(1);
  });
}

// Execute when run as a script
if (require.main === module) {
  exports.default();
}
