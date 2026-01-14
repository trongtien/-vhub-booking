import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { Debug } from './debug-console';

export default function makeMigration(migrationName: string, migrationsFolder: string) {
  if (!migrationName) {
    Debug.Error('==> Error: Migration name is required');
    return;
  }

  const timestamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0]!.replace('T', '_');
  const fileName = `${timestamp}_${migrationName}.ts`;
  const filePath = resolve(migrationsFolder, fileName);

  const template = `
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    console.log('==> Run migration ${migrationName}');
    
    // TODO: Add your migration logic here
    // Example:
    await knex.raw('
      if exists create schema schema_name;
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

      create table  schema_name.table_name (
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    ')

    
    console.log('==> Migration ${migrationName} completed');
}

export async function down(knex: Knex): Promise<void> {
    // TODO: Add your rollback logic here
    // Example:
    //await knex.raw('DROP TABLE IF EXISTS table_name');
    
    console.log('==> Rollback ${migrationName} completed');
}
`;

  try {
    writeFileSync(filePath, template, 'utf-8');
    Debug.Log(`==> Created migration: ${fileName}`);
    Debug.Log(`==> Location: ${filePath}`);
    return filePath;
  } catch (error) {
    Debug.Error('==> Error creating migration file:');
    Debug.Error(`    --> ${error}`);
    throw error;
  }
}
