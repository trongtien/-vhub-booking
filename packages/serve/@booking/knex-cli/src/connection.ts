import knex, { type Knex } from 'knex';
import { registerConfig } from './register-config';
import { ConnectionConfig } from './type';

let connectionInstance: Knex;

export function registerConnection(config: Partial<ConnectionConfig>, logger?: any): Knex {
    if (!connectionInstance) {
        try {
            const cf = registerConfig(config)
            connectionInstance = knex(cf);
            logger?.info('==> Knex instance created successfully');
        } catch (error) {
            logger?.error('==> Error creating Knex instance', { error });
        }
    }

    return connectionInstance;
}
