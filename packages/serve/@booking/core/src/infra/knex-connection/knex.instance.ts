import knex, { Knex } from 'knex';
import { createKnexConfig } from './knex.config';
import { ConnectionConfig } from '../../types';
import { LoggerAdapter } from '../../helpers';

let knexInstance: Knex;

export function registerConnectionKnex(config: Partial<ConnectionConfig>, logger?: LoggerAdapter): Knex {
    if (!knexInstance) {
        try {
            const cf = createKnexConfig(config)
            knexInstance = knex(cf);
            logger?.info('==> Knex instance created successfully');
        } catch (error) {
            logger?.error('==> Error creating Knex instance', { error });
        }
    }

    return knexInstance;
}
