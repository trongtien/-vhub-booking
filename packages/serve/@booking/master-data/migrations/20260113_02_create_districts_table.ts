import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    console.log('==> Run migration districts table');
    await knex.schema.createTable('districts', (table) => {
        table.increments('id').primary();
        table.string('code', 20).notNullable().unique();
        table.string('name', 255).notNullable();
        table.string('name_en', 255);
        table.string('full_name', 255);
        table.string('full_name_en', 255);
        table.string('code_name', 255);
        table.integer('province_id').unsigned().notNullable();
        table.timestamps(true, true);

        table.index('code');
        table.index('name');
        table.index('province_id');
        table.foreign('province_id').references('id').inTable('provinces').onDelete('CASCADE');
    });

    console.log('==> Created districts table');
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('districts');
    console.log('==> Dropped districts table');
}
