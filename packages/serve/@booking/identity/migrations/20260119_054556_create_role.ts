
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    console.log('==> Run migration create_role');
    await knex.raw(`
        CREATE SCHEMA IF NOT EXISTS identity;

        create table identity.roles (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            tenant_id UUID REFERENCES identity.tenants(id),
            role_name VARCHAR(250),
            permissions JSONB ,

            created_by VARCHAR(255) DEFAULT null,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

            updated_by VARCHAR(255) DEFAULT null,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
    `)

    
    console.log('==> Migration create_role completed');
}

export async function down(knex: Knex): Promise<void> {
    await knex.raw('DROP TABLE IF EXISTS identity.roles;');
    console.log('==> Rollback create_role completed');
}
