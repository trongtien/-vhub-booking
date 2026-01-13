import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const migrationName = process.argv[2];

if (!migrationName) {
  console.error('❌ Error: Migration name is required');
  console.log('Usage: pnpm migrate:make <migration_name>');
  console.log('Example: pnpm migrate:make create_users_table');
  process.exit(1);
}

const timestamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0]!.replace('T', '_');
const fileName = `${timestamp}_${migrationName}.ts`;
const filePath = resolve(__dirname, './migrations', fileName);

const template = `import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    console.log('==> Run migration ${migrationName}');
    
    // TODO: Add your migration logic here
    // Example:
    // await knex.schema.createTable('table_name', (table) => {
    //     table.increments('id').primary();
    //     table.string('name').notNullable();
    //     table.timestamps(true, true);
    // });
    
    console.log('==> Migration ${migrationName} completed');
}

export async function down(knex: Knex): Promise<void> {
    // TODO: Add your rollback logic here
    // Example:
    // await knex.schema.dropTableIfExists('table_name');
    
    console.log('==> Rollback ${migrationName} completed');
}
`;

try {
  writeFileSync(filePath, template, 'utf-8');
  console.log(`✅ Created migration: ${fileName}`);
  console.log(`📁 Location: migrations/${fileName}`);
} catch (error) {
  console.error('❌ Error creating migration file:', error);
  process.exit(1);
}
