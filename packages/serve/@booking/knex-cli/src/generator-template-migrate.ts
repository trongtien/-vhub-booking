import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

export default function makeMigration(migrationName: string, migrationsFolder: string) {
  if (!migrationName) {
    console.error('❌ Error: Migration name is required');
    return;
  }

  const timestamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0]!.replace('T', '_');
  const fileName = `${timestamp}_${migrationName}.ts`;
  const filePath = resolve(migrationsFolder, fileName);

  const template = `
import { Knex } from 'knex';

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
    console.log(`📁 Location: ${filePath}`);
    return filePath;
  } catch (error) {
    console.error('❌ Error creating migration file:', error);
    throw error;
  }
}
