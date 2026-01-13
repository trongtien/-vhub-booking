import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    console.log('==> Run migration provinces table');
    await knex.schema.createTable('provinces', (table) => {
        table.increments('id').primary();
        table.string('code', 20).notNullable().unique();
        table.string('name', 255).notNullable();
        table.string('name_en', 255);
        table.string('full_name', 255);
        table.string('full_name_en', 255);
        table.string('code_name', 255);
        table.timestamps(true, true);

        table.index('code');
        table.index('name');
    });

    console.log('==> Created provinces table');
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('provinces');
    console.log('==> Dropped provinces table');
}
