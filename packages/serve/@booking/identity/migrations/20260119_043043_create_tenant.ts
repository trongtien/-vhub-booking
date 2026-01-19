
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    console.log('==> Run migration create_tenant');

    await knex.raw(`
      CREATE SCHEMA IF NOT EXISTS identity;
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

      CREATE TYPE identity.tenant_subscription_plan_enum AS ENUM ('BASIC', 'PRO', 'ENTERPRISE');
      CREATE TYPE identity.tenant_status_enum AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');

      CREATE TABLE identity.tenants (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

        business_name VARCHAR(255) NOT NULL,
        tax_code VARCHAR(20) UNIQUE,
        db_schema_name VARCHAR(50) UNIQUE,

        subscription_plan identity.tenant_subscription_plan_enum,
        status identity.tenant_status_enum DEFAULT 'ACTIVE',

        created_by VARCHAR(255) DEFAULT null,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

        updated_by VARCHAR(255) DEFAULT null,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `)

    console.log('==> Migration create_tenant completed');
}

export async function down(knex: Knex): Promise<void> {
    await knex.raw('DROP TABLE IF EXISTS identity.tenants;');
    await knex.raw('DROP TYPE IF EXISTS identity.tenant_subscription_plan_enum;');
    await knex.raw('DROP TYPE IF EXISTS identity.tenant_status_enum;');

    console.log('==> Rollback create_tenant completed');
}
