import type { Knex } from 'knex'

export type { Knex }

export type ConnectionConfig = {
  client?: "pg" | "mysql" | "sqlite3"
  host: string
  port: string | number
  database: string
  user: string
  password: string
  ssl: 'true' | 'false'
  tableNameMigration?: string
  minPool?: number
  maxPool?: number
}

export type MigrateConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  folder: string;
  tableName?: string;
};