import knex, { Knex } from 'knex';
import { createKnexConfig } from './knex.config';
import { ConnectionConfig } from '../../types';

let knexInstance: Knex;

export function registerConnectionKnex(config: Partial<ConnectionConfig>): Knex {
    if (!knexInstance) {
        const cf  = createKnexConfig(config)
        knexInstance = knex(cf);
    }

    return knexInstance;
}
