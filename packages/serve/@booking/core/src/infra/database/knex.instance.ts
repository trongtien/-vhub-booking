import knex, { Knex } from 'knex';
import { createKnexConfig } from './knex.config';

let knexInstance: Knex;

export function getKnex(): Knex {
    if (!knexInstance) {
        knexInstance = knex(createKnexConfig());
    }
    return knexInstance;
}