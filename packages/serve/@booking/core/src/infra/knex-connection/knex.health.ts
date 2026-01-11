import { getKnex } from './knex.instance';

export async function checkDbHealth() {
  await getKnex().raw('SELECT 1');
}