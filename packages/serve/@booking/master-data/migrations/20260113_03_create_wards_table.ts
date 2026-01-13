import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    console.log('==> Run migration wards table');
    await knex.schema.createTable('wards', (table) => {
        table.increments('id').primary();
        table.string('code', 20).notNullable().unique();
        table.string('name', 255).notNullable();
        table.string('name_en', 255);
        table.string('full_name', 255);
        table.string('full_name_en', 255);
        table.string('code_name', 255);
        table.integer('district_id').unsigned().notNullable();
        table.timestamps(true, true);

        table.index('code');
        table.index('name');
        table.index('district_id');
        table.foreign('district_id').references('id').inTable('districts').onDelete('CASCADE');
    });

    console.log('==> Created wards table');
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('wards');
    console.log('==> Dropped wards table');
}
