
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    console.log('==> Run migration create_users');
    await knex.raw(`
        CREATE SCHEMA IF NOT EXISTS identity;
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

        CREATE TYPE identity.user_status AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');

        create table identity.users (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            tenant_id UUID REFERENCES identity.tenants(id),

            email VARCHAR(255) UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            full_name VARCHAR(255),

            role_id UUID,

            status identity.user_status DEFAULT 'ACTIVE',

            created_by VARCHAR(255) DEFAULT null,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

            updated_by VARCHAR(255) DEFAULT null,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
    `)


    console.log('==> Migration create_users completed');
}

export async function down(knex: Knex): Promise<void> {
    await knex.raw('DROP TABLE IF EXISTS identity.users;');

    console.log('==> Rollback create_users completed');
}
