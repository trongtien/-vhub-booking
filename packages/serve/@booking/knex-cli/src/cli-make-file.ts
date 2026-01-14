import { resolve } from 'node:path';
import { parseArgs } from './cli-common';
import makeMigration from './generator-template-migrate';

export default () => {
  if (require.main !== module) return;

  const args = parseArgs(process.argv.slice(2));

  if (!args.name) {
    console.error('==> Error: Migration name is required');
    console.log('==> Usage: ts-node cli-make-file.ts --name=<migration_name> --path=<migrations_folder>');
    console.log('==> Example: ts-node cli-make-file.ts --name="create_users_table" --path="./migrations"');
    process.exit(1);
  }

  if (!args.path) {
    console.error('==> Error: Migrations path is required');
    console.log('==> Usage: ts-node cli-make-file.ts --name=<migration_name> --path=<migrations_folder>');
    process.exit(1);
  }

  const migrationsFolder = resolve(process.cwd(), args.path);
  makeMigration(args.name, migrationsFolder);

  console.log('==> Generator file: success ', args.name, 'in folder', migrationsFolder);
}

// Execute when run as a script
if (require.main === module) {
  exports.default();
}